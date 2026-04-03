import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Appointment,
  CustomerPhoto,
  Service,
  Staff,
  Status,
} from "../backend";
import { ExternalBlob } from "../backend";
import { useActor } from "./useActor";

// ── Services ──────────────────────────────────────────────────────────────────

export function useServices() {
  const { actor, isFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useServicesByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Service[]>({
    queryKey: ["services", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getServicesByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

// ── Staff ─────────────────────────────────────────────────────────────────────

export function useStaffMembers() {
  const { actor, isFetching } = useActor();

  return useQuery<Staff[]>({
    queryKey: ["staff"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStaffMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Appointments ──────────────────────────────────────────────────────────────

export function useAppointments() {
  const { actor, isFetching } = useActor();

  return useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      clientName,
      serviceId,
      staffId,
      datetime,
    }: {
      clientName: string;
      serviceId: bigint;
      staffId: bigint;
      datetime: bigint;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.bookAppointment(clientName, serviceId, staffId, datetime);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

export function useUpdateAppointmentStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: Status }) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.updateAppointmentStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

// ── Customer Photos ───────────────────────────────────────────────────────────

export function useCustomerPhotos() {
  const { actor, isFetching } = useActor();

  return useQuery<CustomerPhoto[]>({
    queryKey: ["customerPhotos"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCustomerPhotos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddCustomerPhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      customerName,
      photoBlob,
      review,
      onProgress,
    }: {
      customerName: string;
      photoBlob: Uint8Array<ArrayBuffer>;
      review: string;
      onProgress?: (percentage: number) => void;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      let blob = ExternalBlob.fromBytes(photoBlob);
      if (onProgress) {
        blob = blob.withUploadProgress(onProgress);
      }
      return actor.addCustomerPhoto(customerName, blob, review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerPhotos"] });
    },
  });
}

export function useDeleteCustomerPhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not initialized");
      return actor.deleteCustomerPhoto(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerPhotos"] });
    },
  });
}
