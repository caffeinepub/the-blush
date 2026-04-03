# The Blush

## Current State
The app has an `/admin` route with an `Admin.tsx` page that manages bookings and customer photos. Backend functions `getAppointments()`, `updateAppointmentStatus()`, `addCustomerPhoto()`, `deleteCustomerPhoto()` all require admin role via `AccessControl`. The `useActor` hook can create either an anonymous actor or an authenticated actor (when Internet Identity is used). The admin page currently has NO login gate — it renders the full dashboard regardless of auth state, causing silent failures when the user is not logged in (backend rejects admin calls, queries return empty arrays or error).

## Requested Changes (Diff)

### Add
- Login gate on the Admin page: if user is not authenticated, show a centered login screen with Internet Identity login button
- Show loading state while auth is initializing
- Display a logout button when logged in

### Modify
- `Admin.tsx`: Add auth check using `useInternetIdentity()`. If `isInitializing`, show spinner. If no `identity`, show login prompt. Only render the dashboard when authenticated.
- Show error feedback on appointment query failures (currently silent)

### Remove
- Nothing removed

## Implementation Plan
1. In `Admin.tsx`, destructure `login`, `isInitializing`, `identity`, `clear` from `useInternetIdentity()`.
2. If `isInitializing`, render a centered spinner.
3. If no `identity`, render a branded login screen with an "Login with Internet Identity" button.
4. If `identity` present, render the existing dashboard (add a logout button in the header).
5. Add error state handling for `useAppointments` to show a visible error message if the query fails.
