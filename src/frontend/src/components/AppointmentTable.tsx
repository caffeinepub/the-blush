import { CheckCircle, Loader2, XCircle } from "lucide-react";
import type { Appointment } from "../backend";
import { Status } from "../backend";
import {
  useServices,
  useStaffMembers,
  useUpdateAppointmentStatus,
} from "../hooks/useQueries";

interface Props {
  appointments: Appointment[];
}

function formatDatetime(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  return new Date(ms).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    [Status.pending]:
      "bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30",
    [Status.confirmed]: "bg-green-50 text-green-700 border border-green-200",
    [Status.cancelled]: "bg-red-50 text-red-600 border border-red-200",
  };
  return (
    <span
      className={`font-sans text-[0.6rem] tracking-[0.12em] uppercase font-semibold px-2.5 py-1 ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function AppointmentTable({ appointments }: Props) {
  const { data: services } = useServices();
  const { data: staff } = useStaffMembers();
  const updateMutation = useUpdateAppointmentStatus();

  const getServiceName = (id: bigint) =>
    services?.find((s) => s.id === id)?.name ?? `Service #${id}`;
  const getStaffName = (id: bigint) =>
    staff?.find((s) => s.id === id)?.name ?? `Staff #${id}`;

  if (appointments.length === 0) {
    return (
      <div className="text-center py-16 border border-border bg-card">
        <p className="font-serif text-xl text-muted-foreground">
          No appointments found.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-foreground">
              <th className="font-sans text-[0.6rem] tracking-[0.15em] uppercase font-semibold text-background/60 text-left px-5 py-4">
                ID
              </th>
              <th className="font-sans text-[0.6rem] tracking-[0.15em] uppercase font-semibold text-background/60 text-left px-5 py-4">
                Client
              </th>
              <th className="font-sans text-[0.6rem] tracking-[0.15em] uppercase font-semibold text-background/60 text-left px-5 py-4">
                Service
              </th>
              <th className="font-sans text-[0.6rem] tracking-[0.15em] uppercase font-semibold text-background/60 text-left px-5 py-4">
                Stylist
              </th>
              <th className="font-sans text-[0.6rem] tracking-[0.15em] uppercase font-semibold text-background/60 text-left px-5 py-4">
                Date & Time
              </th>
              <th className="font-sans text-[0.6rem] tracking-[0.15em] uppercase font-semibold text-background/60 text-left px-5 py-4">
                Status
              </th>
              <th className="font-sans text-[0.6rem] tracking-[0.15em] uppercase font-semibold text-background/60 text-left px-5 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, idx) => {
              const isUpdating =
                updateMutation.isPending &&
                (updateMutation.variables as { id: bigint })?.id === appt.id;

              return (
                <tr
                  key={String(appt.id)}
                  className={`border-t border-border transition-colors ${
                    idx % 2 === 0 ? "bg-card" : "bg-background"
                  } hover:bg-muted/40`}
                >
                  <td className="font-sans text-xs text-muted-foreground px-5 py-4">
                    #{String(appt.id)}
                  </td>
                  <td className="font-sans text-sm font-medium text-foreground px-5 py-4">
                    {appt.clientName}
                  </td>
                  <td className="font-sans text-xs text-muted-foreground px-5 py-4">
                    {getServiceName(appt.serviceId)}
                  </td>
                  <td className="font-sans text-xs text-muted-foreground px-5 py-4">
                    {getStaffName(appt.staffId)}
                  </td>
                  <td className="font-sans text-xs text-muted-foreground px-5 py-4 whitespace-nowrap">
                    {formatDatetime(appt.datetime)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={appt.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {appt.status !== Status.confirmed && (
                        <button
                          type="button"
                          onClick={() =>
                            updateMutation.mutate({
                              id: appt.id,
                              status: Status.confirmed,
                            })
                          }
                          disabled={isUpdating}
                          className="inline-flex items-center gap-1.5 font-sans text-[0.6rem] tracking-[0.1em] uppercase font-semibold px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                          title="Confirm"
                        >
                          {isUpdating ? (
                            <Loader2 size={11} className="animate-spin" />
                          ) : (
                            <CheckCircle size={11} strokeWidth={1.5} />
                          )}
                          Confirm
                        </button>
                      )}
                      {appt.status !== Status.cancelled && (
                        <button
                          type="button"
                          onClick={() =>
                            updateMutation.mutate({
                              id: appt.id,
                              status: Status.cancelled,
                            })
                          }
                          disabled={isUpdating}
                          className="inline-flex items-center gap-1.5 font-sans text-[0.6rem] tracking-[0.1em] uppercase font-semibold px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                          title="Cancel"
                        >
                          {isUpdating ? (
                            <Loader2 size={11} className="animate-spin" />
                          ) : (
                            <XCircle size={11} strokeWidth={1.5} />
                          )}
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
