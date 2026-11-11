# Tenancy – front-end skeleton

Rent tracking and maintenance requests for landlords and tenants in Bahrain.
COSC 484/484L Web Engineering, Fall 2026 – Progress Report 2.

**Team:** Rayana Juman (A01372) · Shahd Alharbi (A00353)

## What's here

The main pages from the Figma prototype, built in React with sample data (no backend yet):

| Area | Pages |
|---|---|
| Public & account | Landing, Log in (with error state), Register, Verify email, Forgot password, Welcome |
| Landlord mode | Dashboard, Properties, Add property, Property details with tabs: Overview, Leases & invites, Rent (confirm / reject with reason), Receipts, Maintenance requests, Request details |
| Tenant mode | Dashboard, Accept invite, My lease with tabs: Overview, Pay rent, Proof submitted, History, Receipts, Requests, New request, Request status |
| Shared | Settings, Profile, Notifications, 404 |

One account can be both landlord and tenant; the Landlord | Tenant switch changes mode.
Every page works in English and Arabic (right to left).

## Stack

React 18 + Vite · React Router 6 · Tailwind CSS 3 (logical `ms-`/`me-`/`start-` utilities for RTL) · i18next + react-i18next

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

Demo log in: any email with the password `tenancy123` (any other password shows the error state).

## Tests

Automated checks used for the report (need a running preview and Playwright):

```bash
npm run build && npx vite preview --port 4173 &
npm i -D playwright && npx playwright install chromium
npm run test:a11y    # axe WCAG 2.1 AA on 30 routes × EN/AR × mobile/desktop
npm run test:flows   # 38 end-to-end checks of the main user flows
```

## Structure

```
src/
  components/   Layout (header, sidebar, bottom tabs, role switch), ui (buttons, fields, dialog, tabs…)
  pages/        public/, landlord/, tenant/, shared/
  locales/      en.json, ar.json
  data/mock.js  sample data (replaced by the API in the next milestone)
tests/          axe accessibility audit and end-to-end flow checks
```
