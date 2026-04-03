import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { CalendarPlus, LayoutDashboard, LogOut, RefreshCw } from "lucide-react";
import { useState } from "react";
import type { Appointment } from "../backend";
import { Status } from "../backend";
import AppointmentTable from "../components/AppointmentTable";
import CustomerPhotoManager from "../components/CustomerPhotoManager";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useAppointments } from "../hooks/useQueries";

type MainTab = "appointments" | "photos";
type ApptTab = "pending" | "confirmed" | "cancelled" | "all";

function StatCard({
  label,
  value,
  accent,
}: { label: string; value: number; accent?: boolean }) {
  return (
    <div
      className={`border p-6 bg-card ${
        accent ? "border-[var(--gold)]/50" : "border-border"
      }`}
    >
      <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase font-semibold text-muted-foreground mb-2">
        {label}
      </p>
      <p
        className={`font-serif text-4xl font-light ${
          accent ? "text-[var(--gold)]" : "text-foreground"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default function Admin() {
  const [mainTab, setMainTab] = useState<MainTab>("appointments");
  const [apptTab, setApptTab] = useState<ApptTab>("pending");

  const { identity, login, clear, isInitializing } = useInternetIdentity();

  const {
    data: appointments,
    isLoading: apptLoading,
    refetch: refetchAppts,
    isError: apptError,
  } = useAppointments();

  const pending =
    appointments?.filter((a: Appointment) => a.status === Status.pending) ?? [];
  const confirmed =
    appointments?.filter((a: Appointment) => a.status === Status.confirmed) ??
    [];
  const cancelled =
    appointments?.filter((a: Appointment) => a.status === Status.cancelled) ??
    [];

  const apptTabData: Record<ApptTab, Appointment[]> = {
    pending,
    confirmed,
    cancelled,
    all: appointments ?? [],
  };

  const mainTabClass = (tab: MainTab) =>
    `font-sans text-xs tracking-[0.15em] uppercase font-semibold px-6 py-3 border-b-2 transition-colors duration-200 ${
      mainTab === tab
        ? "border-[var(--gold)] text-[var(--gold)]"
        : "border-transparent text-muted-foreground hover:text-foreground"
    }`;

  const apptTabClass = (tab: ApptTab) =>
    `font-sans text-[0.65rem] tracking-[0.12em] uppercase font-medium px-4 py-2 transition-colors duration-200 ${
      apptTab === tab
        ? "bg-[var(--gold)] text-white"
        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
    }`;

  // --- Initializing state ---
  if (isInitializing) {
    return (
      <div
        className="min-h-screen bg-foreground flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="w-10 h-10 border-2 border-[var(--gold)]/30 border-t-[var(--gold)] rounded-full animate-spin" />
      </div>
    );
  }

  // --- Not logged in state ---
  if (!identity) {
    return (
      <div
        className="min-h-screen bg-foreground flex items-center justify-center px-6"
        data-ocid="admin.login_screen"
      >
        <div className="text-center max-w-sm">
          {/* Brand */}
          <p className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-[var(--gold-light)] mb-3">
            The Blush
          </p>
          <h1 className="font-serif text-4xl font-light text-white mb-2">
            Admin Access
          </h1>
          <div className="w-8 h-px bg-[var(--gold)]/60 mx-auto my-4" />
          <p className="font-sans text-sm text-white/50 tracking-wide mb-10">
            Login is required to manage bookings and content.
          </p>
          <button
            type="button"
            onClick={login}
            data-ocid="admin.login_button"
            className="inline-flex items-center justify-center gap-2 font-sans text-xs tracking-[0.18em] uppercase font-semibold px-8 py-3.5 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors w-full"
          >
            Login with Internet Identity
          </button>
          <p className="font-sans text-[0.6rem] text-white/25 mt-6 tracking-wide">
            Secure authentication via Internet Computer
          </p>
        </div>
      </div>
    );
  }

  // --- Logged in state ---
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <LayoutDashboard
                size={14}
                strokeWidth={1.5}
                className="text-[var(--gold-light)]"
              />
              <p className="font-sans text-[0.65rem] tracking-[0.25em] uppercase font-semibold text-[var(--gold-light)]">
                Admin
              </p>
            </div>
            <h1 className="font-serif text-4xl font-light text-white">
              Dashboard
            </h1>
            {identity && (
              <p className="font-sans text-xs text-white/40 mt-2 tracking-wide">
                {identity.getPrincipal().toString().slice(0, 20)}…
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase font-semibold px-5 py-2.5 border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
              data-ocid="admin.booking_link"
            >
              <CalendarPlus size={13} strokeWidth={1.5} />
              New Booking
            </Link>
            <button
              type="button"
              onClick={() => refetchAppts()}
              data-ocid="admin.refresh_button"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase font-semibold px-5 py-2.5 bg-[var(--gold)] text-white hover:bg-[var(--gold-dark)] transition-colors"
            >
              <RefreshCw size={13} strokeWidth={1.5} />
              Refresh
            </button>
            <button
              type="button"
              onClick={clear}
              data-ocid="admin.logout_button"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase font-semibold px-5 py-2.5 border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
            >
              <LogOut size={13} strokeWidth={1.5} />
              Logout
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Error state */}
        {apptError && (
          <div
            data-ocid="admin.error_state"
            className="mb-8 border border-red-500/40 bg-red-500/10 px-5 py-4 text-sm font-sans text-red-400 tracking-wide"
          >
            ⚠ Failed to load appointments. Make sure you are logged in as admin.
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {apptLoading ? (
            ["a", "b", "c", "d"].map((id) => (
              <div key={id} className="border border-border p-6 bg-card">
                <Skeleton className="h-3 w-20 mb-3" />
                <Skeleton className="h-10 w-12" />
              </div>
            ))
          ) : (
            <>
              <StatCard
                label="Total Bookings"
                value={appointments?.length ?? 0}
              />
              <StatCard label="Pending" value={pending.length} accent />
              <StatCard label="Confirmed" value={confirmed.length} />
              <StatCard label="Cancelled" value={cancelled.length} />
            </>
          )}
        </div>

        {/* Main Tabs */}
        <div className="border-b border-border mb-8 flex gap-0">
          <button
            type="button"
            className={mainTabClass("appointments")}
            onClick={() => setMainTab("appointments")}
            data-ocid="admin.appointments.tab"
          >
            Appointments
          </button>
          <button
            type="button"
            className={mainTabClass("photos")}
            onClick={() => setMainTab("photos")}
            data-ocid="admin.photos.tab"
          >
            Customer Photos
          </button>
        </div>

        {/* Appointments Tab */}
        {mainTab === "appointments" && (
          <div>
            {/* Sub-tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(["pending", "confirmed", "cancelled", "all"] as ApptTab[]).map(
                (tab) => (
                  <button
                    type="button"
                    key={tab}
                    className={apptTabClass(tab)}
                    onClick={() => setApptTab(tab)}
                    data-ocid={`admin.${tab}.tab`}
                  >
                    {tab === "all"
                      ? "All"
                      : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    <span className="ml-1.5 opacity-70">
                      ({apptTabData[tab].length})
                    </span>
                  </button>
                ),
              )}
            </div>

            {apptLoading ? (
              <div
                className="space-y-3"
                data-ocid="admin.appointments.loading_state"
              >
                {["a", "b", "c", "d"].map((id) => (
                  <Skeleton key={id} className="h-14 w-full" />
                ))}
              </div>
            ) : (
              <AppointmentTable appointments={apptTabData[apptTab]} />
            )}
          </div>
        )}

        {/* Photos Tab */}
        {mainTab === "photos" && <CustomerPhotoManager />}
      </div>
    </div>
  );
}
