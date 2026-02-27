# FE-003 Design Tokens and Component Baseline

- Ticket ID: FE-003
- Iteration: 0
- Status: In Progress
- Owner: Frontend + Design
- Backend dependency: none

## Objective

Create a reusable component baseline for forms, lists, cards, and status states.

## Implementation Progress (2026-02-27)

- Added reusable UI primitives in `src/components/ui`:
	- `Card`
	- `Button`
	- `TextField`
	- `StatusChip`
	- `StatusValue`
	- `EmptyState`
- Added shared token file `src/components/ui/theme.ts` to centralize baseline colors and radius values.
- Applied primitives to baseline screens:
	- `src/screens/StaffItemCaptureScreen.tsx`
	- `src/screens/StaffSearchScreen.tsx`
	- `src/screens/ClaimantSearchScreen.tsx`
- Added shared navigation/shell primitives:
	- `src/components/ui/ScreenHeader.tsx`
	- `src/components/ui/SegmentedControl.tsx`
- Updated app shell and staff flow switcher to use shared primitives:
	- `App.tsx`
	- `src/screens/StaffIntakeScreen.tsx`

## Prototype Mapping Notes

- Form baseline: implemented with `TextField` and `Button` (`StaffItemCaptureScreen`, `ClaimantSearchScreen`).
- List/detail card baseline: implemented with `Card` in `StaffSearchScreen` result rows.
- Status chip baseline: implemented with `StatusChip` in `StaffSearchScreen`.
- Explicit status messaging: implemented with `StatusValue` across intake/search screens.
- Empty state baseline: implemented with `EmptyState` for staff search results.
- Shared segmented navigation baseline: implemented with `SegmentedControl` in app shell and staff capture/search flow.

## Acceptance Criteria

- Core UI primitives exist and are documented.
- Loading, empty, and error states are available for core surfaces.
- Accessibility spot-checks completed for primitives.

## Verification Evidence

- Component screenshots
- Accessibility checklist results
