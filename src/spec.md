# Specification

## Summary
**Goal:** Add a fee-management app at `/fees` with 12-month (Jan–Dec) fee tracking backed by Motoko storage, while keeping the existing marketing page unchanged at `/`.

**Planned changes:**
- Add a new in-app route at `/fees` that renders the fee-management app UI, while leaving the current marketing landing page unchanged at `/`.
- Add simple in-UI navigation to move between `/` (marketing) and `/fees` (fee app).
- Build the `/fees` UI with two modes: an admin panel to create student records (Name, Phone, PIN) and a student PIN login to view a read-only 12-month paid/unpaid status card (Jan–Dec) in English.
- In the admin UI, allow selecting a student and toggling each month’s status between Paid/Unpaid, with changes persisting after refresh.
- Implement Motoko canister methods in `backend/main.mo` to create students, list students, login via PIN, read fee status, and update month paid/unpaid status, using stable state for upgrade persistence and clear English error results.
- Integrate the fee app frontend with the Motoko backend using the existing actor creation pattern (`useActor`) and React Query for fetching/mutations with cache invalidation/refetch.

**User-visible outcome:** Visitors can keep using the unchanged marketing site at `/`, navigate to `/fees` to add students and manage their Jan–Dec fee statuses as an admin, and students can log in with a PIN to view (read-only) their paid/unpaid status for all 12 months.
