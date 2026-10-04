---
doc: spec
status: approved
---

# OrderFlow — Technical Spec

## How This Works, In Plain Language

OrderFlow is a single-page web application that runs entirely in the browser — no server, no database, no accounts. Think of it as one HTML file that knows how to read a list of orders, think about them, and show the seller what to do.

Here's how the pieces fit together:

**The seed data module** is a JavaScript file that holds a list of pre-written, realistic orders. Right now it's like a spreadsheet frozen in time — it contains all the orders, their statuses, their channel (e-commerce or WhatsApp), and when they were placed. When a real integration is added later, this module is the only thing that changes: instead of exporting a static list, it will fetch the same shaped data from a real API. Everything else in the app stays the same.

**The priority engine** is a set of rules — a function that takes an order and works out how urgent it is. It looks at how old the order is, how long it's been stuck in the same status, whether there are any flags, and which channel it came from. It outputs a priority level (Critical, High, Medium, Low) and a one-sentence plain-English reason. This is the intelligence in OrderFlow. It doesn't learn or guess — it applies clear, predictable rules and explains its answer.

**The app state** is a simple JavaScript object that keeps track of: the current list of orders (with priorities already calculated), and which order the seller has selected. When the seller clicks a button to advance an order, the state updates and the whole display refreshes. It's like the app's short-term memory. Because it lives only in the browser's memory, it resets when the page is refreshed — this is intentional and acceptable for the POC.

**The UI** is three visual zones: a summary bar across the top (the four stat cards), a left panel showing the sorted priority list, and a right panel showing the detail and action for the selected order. The left panel stays visible while the right panel is open — the seller never loses sight of the queue.

This shape — seed data → priority engine → state → UI → action → state update → UI refresh — is the whole system. It's deliberately small. The prioritization logic is real; only the data source is simulated.

---

## The Core Journey Through the System

*Implements `prd.md > The Core Journey`*

1. **Browser opens `index.html`** → the seed data module loads all 7 orders into memory.
2. **Priority engine runs** → each order is evaluated against the 8 rules and gets a `priority` level and `priorityReason` string attached to it. `referenceTime` is set from the seed data's built-in offset (simulated "now"), not the system clock.
3. **Orders are sorted** → Critical first, then High, Medium, Low. Within a level, older orders (earlier `placedAt`) appear first.
4. **Dashboard renders** → summary bar calculates and displays the four counts; the left panel renders all order rows in sorted order.
5. **Seller clicks an order row** → `selectedOrderId` updates; the right panel renders the full detail view for that order — showing all six elements from the PRD.
6. **Seller clicks the primary action button** → the order's `status` advances one step; `lastStatusChangedAt` is updated; the priority engine re-runs on the whole list; the UI re-renders both panels.
7. **Dashboard counts update immediately** — the summary bar recalculates from the updated state.
8. **"Simulate New Order" button** → a new pre-defined WhatsApp order is injected into state; priority engine runs; it appears at the top of the list as High priority.

```
Seed data (orders.js)
       │
       ▼
Priority Engine (priority.js)
  [runs rules, attaches level + reason to each order]
       │
       ▼
App State (app.js)
  { orders: [...], selectedOrderId: null }
       │
       ├──────────────────────────────────────────┐
       ▼                                          ▼
Summary Bar + Order List             Order Detail Panel
(dashboard.js + order-list.js)       (order-panel.js)
       │                                          │
       └──────────── User actions ────────────────┘
                  [click row | click action btn]
                          │
                    State updates
                          │
                    UI re-renders
```

---

## Stack

| Piece | Choice | Why |
|---|---|---|
| Language | HTML5 + CSS3 + vanilla JavaScript (ES Modules) | Matches the learner's existing skills; no new framework to learn; no build step; opens directly in any browser |
| Styling | Vanilla CSS with custom properties (CSS variables) | Full control over the design; no class-name overhead; easy to read and edit |
| Modules | Native ES Modules (`type="module"`) | Lets us split code into logical files without a bundler; works in all modern browsers |
| Data | JavaScript module exporting a static array | Same shape as a future API response; swap the source without changing anything else |
| State | Plain JavaScript object in `app.js` | Simple, readable, no library needed at this scale |
| Runtime | Browser only — open `index.html` | No server, no npm, no install step |
| Build step | None | Not needed; adds complexity without benefit at this size |

**No external services, no API keys, no accounts required.** Everything runs offline.

---

## Where It Runs and How Someone Tries It

**To run:**
1. Open the `OrderFlow/` folder.
2. Double-click `index.html`, or drag it into a browser window.
3. The app loads immediately — no install, no server, no terminal commands needed.

**For the demo recording:**
- Open `index.html` in Chrome or Firefox (both support ES Modules).
- The dashboard loads with the 7 seed orders already prioritised.
- Follow the 60-second demo script in `prd.md > The Happy-Path Demo Flow`.

**Submission requirements:**
- A short demo video (recorded from the browser — any screen recorder works).
- A public GitHub repository containing the project files.
- Deployment is optional and is not required to submit.

**If deployment is chosen later:**
Any static file host works — GitHub Pages (free, no config), Netlify (drag-and-drop deploy), or Vercel. No server-side setup needed. `6-ship` covers this.

---

## Look and Feel

*Carries forward `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`*

**Palette:** Dark background (`#0d1117` or similar near-black). Lighter surface cards (`#161b22`). One electric blue accent for interactive elements and focus states (`#58a6ff`). Priority colors are semantic and consistent everywhere:
- Critical: `#f85149` (red)
- High: `#f0883e` (orange)
- Medium: `#d29922` (yellow/amber)
- Low: `#3fb950` (green)

**Typography:** Inter (loaded from Google Fonts) or `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` as fallback. Strong typographic hierarchy: large numbers on stat cards, readable 14–15px order rows, prominent 16px action buttons. Nothing should require zooming.

**Layout density:** Spacious enough to read at a glance; compact enough to show the full priority list without scrolling on a standard laptop screen. Two-column split view (left list, right panel) — the left list stays visible when the right panel is open.

**Component feel:** Status badges are pill-shaped with color-coded backgrounds. Action buttons are filled, not outlined — one per view, labeled with the specific action (not "Submit"). Priority reason text is italic or muted, always present, never collapsed.

**Tone:** Practical and direct. Labels say exactly what they mean. No marketing language anywhere in the UI.

**References:** Linear, Things 3 — operational task tools, not e-commerce backends.

---

## Components

### App State (`js/app.js`)

The central coordinator. Holds the current order list (with computed priority) and the selected order ID. Exports functions to:
- Initialize: load seed data, run priority engine, render everything.
- Select an order: update `selectedOrderId`, re-render the detail panel.
- Advance an order's status: update `status` and `lastStatusChangedAt`, re-run priority engine on all orders, re-sort, re-render both panels and summary bar.
- Simulate a new order: inject a pre-defined new WhatsApp order into state, re-run engine, re-render.

*PRD ref: `prd.md > Features and Behavior` (all sections)*

### Seed Data (`js/data/orders.js`)

Exports the array of 7 pre-written order objects (see Data Model below) plus one pre-defined "simulate" order. Timestamps are set as JavaScript `Date` objects using a fixed offset from a defined `SEED_REFERENCE_TIME` constant — a date/time written into the module that represents "now" for the simulation.

**This module is the future integration seam.** In production, it would be replaced by a function that calls a real API and returns data in the same shape. Nothing else in the system needs to change.

*PRD ref: `prd.md > Simulated Order Data`*

### Priority Engine (`js/engine/priority.js`)

A pure function: takes an order and a `referenceTime`, applies the 8 rules in order (first match wins), and returns `{ priority, priorityReason }`.

```
calculatePriority(order, referenceTime):
  ageMinutes        = (referenceTime − order.placedAt) / 60,000
  stallMinutes      = (referenceTime − order.lastStatusChangedAt) / 60,000
  hoursToDeadline   = (order.expectedBy − referenceTime) / 3,600,000

  Rule 1: deadline within 2h + not shipped/completed → Critical
  Rule 2: status=new + age > 60min → High
  Rule 3: channel=whatsapp + status=new + age > 30min → High
  Rule 4: flags includes missing_payment or missing_info → High
  Rule 5: non-terminal status + stall > 180min → High
  Rule 6: status=new or accepted + age ≤ 60min → High ("New order — action required")
  Rule 7: status=completed → Low
  Rule 8: default → Medium ("Order is in progress")
```

**`referenceTime` in the POC** is the `SEED_REFERENCE_TIME` constant exported from `orders.js`. The engine is called as `calculatePriority(order, referenceTime)` — switching to `Date.now()` for production requires changing only the argument at the call site in `app.js`. The engine itself never changes.

*PRD ref: `prd.md > Prioritization Engine`*

### Dashboard Summary Bar (`js/components/dashboard.js`)

Renders the four stat cards: Total Orders, Need Attention (Critical + High, non-completed), Critical count, High count. Re-renders whenever state changes. Reads directly from the sorted orders array in state.

*PRD ref: `prd.md > Dashboard Summary Bar`*

### Order List (`js/components/order-list.js`)

Renders the left-panel sorted order rows. Each row: priority badge, order ID + customer name, channel icon, status label, priority reason (one line), and a subtle "View →" affordance. Clicking a row calls `selectOrder(id)` on the app state. Highlights the currently selected row.

*PRD ref: `prd.md > Priority Order List`*

### Order Detail Panel (`js/components/order-panel.js`)

Renders the right panel when an order is selected. Contains all six elements from the PRD: what, where, status, priority reason box (always visible), recommended action label, and primary action button. The action button label is derived from the status transition table. Clicking it calls `advanceOrder(id)` on the app state. Renders a "Closed" / empty state when no order is selected (left panel occupies full width until an order is chosen).

Also renders the Contact Customer section with tappable `tel:`, `mailto:`, and `wa.me/` links as appropriate for the order's channel.

*PRD ref: `prd.md > Order Detail View`, `prd.md > Contact Customer`*

---

## Data Model

Each order is a plain JavaScript object with this shape:

```
Order {
  id:                   string        // "#1042"
  customer: {
    name:               string        // "Chiamaka Osei"
    phone:              string        // "+234 803 xxx xxxx"
    email:              string | null
    whatsappNumber:     string | null // used for wa.me/ link
  }
  items: [
    { name: string, qty: number, variant: string | null }
  ]
  total:                number        // 18500
  currency:             string        // "₦"
  channel:              "ecommerce" | "whatsapp"
  status:               "new" | "accepted" | "processing"
                        | "ready" | "shipped" | "completed"
  placedAt:             Date          // seed timestamp
  expectedBy:           Date | null   // fulfillment deadline (for Critical rule)
  lastStatusChangedAt:  Date          // updated on every status advance
  flags:                string[]      // e.g. ["missing_payment"], [] for most
  // Computed by priority engine — not stored in seed data:
  priority:             "critical" | "high" | "medium" | "low"
  priorityReason:       string
}
```

**Where data lives:** In memory only, as the `orders` array in `app.js` state. There is no file write, no localStorage, no server. Refreshing the page resets everything to seed data — explicitly accepted in `prd.md > Product Decisions`.

**Status transition table** (drives action button labels):

| Current Status | Action Button Label | Next Status |
|---|---|---|
| new | Accept Order | accepted |
| accepted | Mark as Processing | processing |
| processing | Mark as Ready for Delivery | ready |
| ready | Mark as Shipped | shipped |
| shipped | Mark as Completed | completed |
| completed | *(no button)* | — |

**Seed order data summary** (full objects defined in `orders.js`):

| ID | Customer | Channel | Status | Flags | Expected Priority |
|---|---|---|---|---|---|
| #1042 | Chiamaka Osei | WhatsApp | new | — | Critical (deadline) |
| #1039 | Emeka Okafor | E-Commerce | new | — | High (waiting >60min) |
| #1035 | Adaeze Nwosu | E-Commerce | processing | — | High (stalled >3h) |
| #1031 | Femi Adeyemi | E-Commerce | accepted | missing_payment | High (flag) |
| #1028 | Ngozi Eze | WhatsApp | processing | — | Medium |
| #1021 | Tunde Balogun | E-Commerce | shipped | — | Medium |
| #1018 | Yetunde Afolabi | E-Commerce | completed | — | Low |

---

## File Structure

```
OrderFlow/
├── index.html                  # Single-page app shell; loads all modules
├── css/
│   ├── base.css                # CSS reset, custom properties (colors, fonts, spacing)
│   ├── layout.css              # Two-column split view, summary bar, responsive rules
│   ├── order-list.css          # Left panel: order rows, priority badges, selected state
│   └── order-panel.css         # Right panel: detail view, priority reason box, action button
├── js/
│   ├── app.js                  # App state, initialization, action handlers, wiring
│   ├── data/
│   │   └── orders.js           # Seed order data + SEED_REFERENCE_TIME constant
│   ├── engine/
│   │   └── priority.js         # Pure priority calculation function (rules + reason text)
│   └── components/
│       ├── dashboard.js        # Summary bar rendering
│       ├── order-list.js       # Left panel order rows rendering + click events
│       └── order-panel.js      # Right panel detail + action button + contact links
├── devpost/
│   ├── learner-profile.md
│   ├── scope.md
│   ├── scope.html
│   ├── prd.md
│   ├── prd.html
│   ├── spec.md                 # This file
│   └── spec.html               # Visual companion
├── .gitignore
└── README.md                   # How to run + brief project description (for GitHub)
```

**Key boundary:** `priority.js` has no knowledge of the UI. `order-list.js` and `order-panel.js` have no knowledge of the priority rules. `app.js` is the only place that connects them. This separation means the priority rules can be changed or upgraded without touching the UI, and vice versa.

---

## External Services and Dependencies

**None.** OrderFlow POC has zero external service dependencies.

| What | Status |
|---|---|
| Backend / API | None — seed data is local |
| Database | None — in-memory state only |
| Authentication | None — single seller, no login |
| WhatsApp API | None — channel is simulated via data field |
| E-Commerce API | None — channel is simulated via data field |
| Google Fonts (Inter) | Optional CDN load — falls back to system sans-serif if offline |
| npm packages | None — no package.json needed |

**Google Fonts:** A single `<link>` in `index.html` loads Inter. If the user is offline, the browser falls back to the system font stack. The app works fully offline; the font is a visual enhancement only.

---

## Important Failure Modes

- **Seed data fails to load** (e.g. browser blocks ES Module imports from `file://`) → the order list renders empty; the "Simulate New Order" button still works; a message reads "No orders loaded — try using a local server or GitHub Pages." Fix: open via a simple local server or deploy to GitHub Pages.

- **Priority engine receives an unexpected status string** → the default rule fires (Rule 8: Medium, "Order is in progress"). No crash; priority is always computed.

- **Contact link phone number is malformed** → `tel:` link renders but may not open correctly on desktop. The raw number is always shown as readable text alongside the link, so the seller can copy it manually.

---

## What Was Simplified and Why

- **In-memory state instead of a database** — order status changes live only for the browser session; refreshing resets to seed data. A database (even localStorage) would add persistence complexity without proving the core loop. Accepted in `prd.md > Product Decisions`.

- **Seed timestamps instead of `Date.now()`** — the priority engine runs against `SEED_REFERENCE_TIME` (a fixed date in the seed data) rather than the current system time. This makes the demo reproducible — the same orders always show the same priorities regardless of when the demo is run. The engine is structured so that switching to real time at the call site in `app.js` requires one line change; the engine itself is unaffected.

- **Simulated channels instead of real APIs** — the `channel` field on each order ("ecommerce" or "whatsapp") drives the icon and contact link format. The seed data module is the exact seam where a real API integration would connect. Nothing else changes.

- **No CSS framework or bundler** — vanilla CSS and native ES Modules. No npm, no build step, no configuration. Opens directly in a browser. Reduces setup friction to zero for a POC.

- **No localStorage persistence** — intentional. Persistence without a real backend would require re-seeding logic and session management, adding complexity that doesn't prove the product idea. Accepted in `prd.md > States and Boundaries`.

---

## Decisions and Open Issues

**Resolved decisions:**

- **Right-side detail panel** (learner decision) — the Order Detail View opens as a right panel while the order list stays visible on the left. Chosen because the seller needs to see the queue and act on an order without losing context. Tradeoff: on narrow screens the panel may stack below the list; a responsive breakpoint will handle this.

- **Seed timestamps for age calculation** (learner decision) — `SEED_REFERENCE_TIME` is defined in `orders.js` and passed to the priority engine. The engine's signature `calculatePriority(order, referenceTime)` keeps the switch to real time a one-argument change at the `app.js` call site. Chosen so the demo is reproducible and the priorities are predictable regardless of when it's run.

- **No framework, no build step** (implementation decision derived from learner stack and POC size) — vanilla HTML/CSS/JS with ES Modules. Tradeoff: no reactive state library means the UI re-renders via direct DOM manipulation or a simple render function pattern; acceptable at this scale.

- **Priority engine as a pure function** (implementation decision) — `calculatePriority` takes inputs and returns output with no side effects. Tradeoff: none at this scale; makes it trivially testable and easy to replace.

**One genuine uncertainty — resolved:**

The learner asked to understand *"how the frontend, backend, database, APIs, and integrations fit together."* In this POC, there is no backend, database, or live API — and that's a deliberate, principled choice, not a shortcut.

Here's the key insight: **the seed data module (`orders.js`) is shaped exactly like an API response.** It exports an array of order objects with the same fields a real backend would return. When the WhatsApp Business API integration is added later, it won't change the priority engine, the UI components, or the app state logic — it will only replace the contents of `orders.js` with a function that fetches live data. The rest of the system doesn't know or care where the orders came from.

This is a real architectural pattern called *dependency inversion* — the system depends on the shape of the data, not on its source. During the build, the boundary where this seam lives (`orders.js` → `app.js`) is worth noticing as the place where "simulated" becomes "real."

**Open issues carried from PRD:**

- None. Both PRD open questions (panel layout, timestamp approach) are resolved above.

**One item to verify early in the build:**

ES Modules loaded via `<script type="module">` may be blocked when opening `index.html` directly from the filesystem in some browsers (a CORS restriction on `file://` URLs). If this happens, the fix is to either serve the folder with a simple local server (`python -m http.server` or VS Code Live Server) or push to GitHub Pages. This should be tested on the first build step before any feature work begins.
