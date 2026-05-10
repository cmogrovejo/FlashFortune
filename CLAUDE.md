# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build to dist/
npm run watch      # Watch mode dev build
npm test           # Unit tests via Vitest
```

Run a single test file:
```bash
npx vitest run src/app/app.spec.ts
```

## Product Overview

**FlashFortune** (codename: FortunaBank Engine) is an enterprise sweepstakes management platform for financial institutions. It processes up to 100 million virtual coupons per draw using a deterministic permutation algorithm (Format-Preserving Encryption / Feistel Cipher) so no coupon rows are physically stored — only virtual ranges per account.

**Core business rules**:
- `BR-02`: One `numero_cuenta` per file (duplicates are flagged and skipped).
- `BR-03`: One prize per `doc_identidad` per draw — the exclusion engine auto re-rolls on collision.
- `BR-06`: Account balances (`saldo_moneda`) are permanently purged from the DB after coupon generation.
- Once a file is confirmed, prizes and rules are locked (immutable).

## RBAC Roles

| Role | Key Capabilities |
|---|---|
| Super Admin | Create/manage Business Units (banks) |
| Admin de Unidad | Invite staff, assign roles within a BU |
| Configurador | Upload data files, define prizes and raffle rules |
| Operador | Run the live draw, use the panic button |
| Auditor | Read-only: download reports and S3 audit logs |

Sessions are scoped to a single Business Unit (JWT is BU-bound). If a user belongs to multiple BUs, they must select one at login before reaching the dashboard.

## Planned Screens & Status

| Screen | Route (current) | Purpose |
|---|---|---|
| P01 — Login | `/login` | Corporate auth (no social login) |
| P02 — BU Selector | `/business-unit` | Multi-tenant context selection |
| P03 — Staff Management | `/staff-management` | Invite users, assign roles via modal |
| P04 — Prize Setup | (not yet built) | Drag-and-drop prize ordering (`@angular/cdk/drag-drop`) |
| P05 — Data Ingestion | (not yet built) | CSV upload dropzone + SignalR progress terminal |
| P06 — Lobby | (not yet built) | Locked sorteo ready state; connect to SignalR hub |
| P07 — Draw Arena | (not yet built) | Live slot-machine animation, exclusion toasts, panic button |
| P08 — Reports | (not yet built) | Audit table, PDF/Excel export links |
| Raffle Dashboard | `/raffle-dashboard` | Grid of raffle cards with status badges |
| Create Raffle | `/create-raffle` | Draft creation form |

## Raffle State Machine

`DRAFT` → `READY` (file locked, balances purged) → `LIVE` (draw in progress) → `ENDED`

UI badge colors follow the design spec:
- **DRAFT**: `bg-slate-700`
- **READY**: `bg-blue-500/20 text-blue-400`
- **LIVE**: `bg-red-500/20 text-red-400` (pulsing)
- **ENDED**: `bg-emerald-500/20 text-emerald-400`

## Full-Stack Architecture

This repo is the **Angular frontend only**. The full system:

| Layer | Technology |
|---|---|
| Frontend | Angular 21 + Tailwind CSS (this repo) |
| Real-time | SignalR (draw events, file processing progress) |
| API / Core | ASP.NET Core (.NET 8, Clean Architecture) |
| Background Jobs | Hangfire (async CSV ingestion of 100M+ rows) |
| Primary DB | PostgreSQL |
| Fast Cache | Redis (winner exclusion list lookups) |
| Storage | AWS S3 with Object Lock / LocalStack locally |

The frontend will connect to the .NET backend via REST for CRUD and SignalR for real-time draw events. When implementing the Draw Arena (P07), SignalR is the source of truth — the server calculates winners and pushes results; the Angular client only animates and displays.

## Angular Architecture

**Routing**: Lazy-loaded standalone components in `src/app/app.routes.ts`. All routes use `loadComponent` — no NgModules. Default redirects to `login`.

**Folder conventions**:
- `src/app/pages/` — one folder per route; complex pages have a nested `components/` subfolder
- `src/app/shared/components/` — reusable components used across multiple pages
- Test files (`.spec.ts`) colocated with the component they test

**Component patterns**:
- All components are `standalone: true` with an explicit `imports` array
- Use `inject()` function for DI (not constructor injection)
- Use Angular's modern control flow (`@if`, `@for`) — not `*ngIf`/`*ngFor`
- Reactive Forms (`FormBuilder`, `FormGroup`) for all form handling
- Angular Signals (`signal()`, `computed()`) for reactive component state

**Styling**:
- Global theme in `src/styles.css` using Tailwind's `@theme` directive
- Dark "Vault" theme: green primary (`#10b981`), amber secondary (`#f59e0b`), cyan tertiary (`#38bdf8`), layered surface colors
- Icons via Iconify utility classes (e.g., `icon-[lucide--lock]`, `icon-[fa6-solid--user]`) — not icon components
- Custom animation: `animate-vault-entry` with inline `animation-delay` for staggered entrances
- Theme variants (`'primary' | 'secondary' | 'tertiary'`) passed as `@Input()` props to cards and buttons

**Code style** (Prettier in package.json): single quotes, 100 char print width, 2-space indent.

**Current state**: All data is hardcoded mock data — no backend integration yet. Domain interfaces (`BusinessUnit`, `RaffleItem`, `StaffMember`) are defined inline in component files rather than in a shared models layer.
