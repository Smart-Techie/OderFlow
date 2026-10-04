---
doc: prd
status: approved
---

# OrderFlow — Product Requirements

An intelligent order operations assistant for small business sellers — one screen that receives orders from multiple channels, understands their state, prioritizes them automatically, and guides the seller to the next action.

*Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`*

---

## The Core Journey

The complete seller experience, end to end:

1. **Seller opens OrderFlow.** The dashboard loads immediately with a summary of the current order queue and a prioritized list of orders.
2. **Dashboard surfaces what matters.** Summary stats across the top (total orders, orders needing attention, critical/high count). Below, orders are sorted by priority — Critical and High rise to the top, each with a one-line plain-English reason.
3. **Seller reads the priority reason.** Without scanning the whole list, they can see which order needs their attention and why: *"High priority — customer has been waiting 2 hours for confirmation."*
4. **Seller opens the order.** The order detail view shows all six elements: what the order is, where it came from, its current status, why it's prioritized, the recommended next action, and a clear action button.
5. **Seller takes the guided action.** One click: Accept, Mark Processing, Mark Ready, Mark Shipped, Complete, or initiate contact. The action is always visible without scrolling.
6. **Order status updates immediately.** The list refreshes. The completed action is reflected. The next highest-priority order surfaces.
7. **Loop continues** until the queue is clear or all remaining orders are low priority.

The seller never has to scan the full list and decide what matters. OrderFlow tells them.

---

## Screens and Layout

OrderFlow is a single-page web application with two primary views: the **Dashboard** and the **Order Detail View**. No navigation beyond switching between these two.

### Dashboard

The main view. Divided into two horizontal zones:

**Top zone — Summary Bar:**
Four stat cards displayed side by side:
- Total Orders
- Orders Needing Attention (Critical + High combined)
- Critical Orders
- High Priority Orders

Each card shows the number prominently and a short label. Orders Needing Attention uses a distinct accent color when the count is above zero.

**Bottom zone — Priority Order List:**
A vertically scrolling list of order rows, sorted by priority (Critical → High → Medium → Low). Within the same priority level, older orders appear first.

Each order row displays:
- Priority badge (color-coded: Critical = red, High = orange, Medium = yellow, Low = green)
- Order ID and customer name
- Channel source icon (🛒 for e-commerce, 💬 for WhatsApp)
- Current status label
- Priority reason (one line, plain English)
- Recommended action (one short phrase, e.g. "Accept order")
- A secondary action button ("View →" or equivalent)

Clicking anywhere on a row opens the Order Detail View for that order.

### Order Detail View

Opens when an order row is selected. Replaces the list view (or slides in as a panel — see Product Decisions). Contains:

1. **Order header:** Order ID, channel source icon, timestamp (when the order was placed).
2. **What the order is:** Customer name, items ordered (name, quantity, variant), and order total.
3. **Where it came from:** Channel label — "E-Commerce Store" or "WhatsApp". In the POC, this is a data field; no live link to an external platform.
4. **Current status:** A visible status badge reflecting the order's current position in the workflow.
5. **Why it's prioritized (Priority Reason box):** A highlighted block showing the priority level and the plain-English reason. Example: *"Critical — order is approaching its expected fulfillment deadline and has not been accepted."* This block is always visible; it is not collapsed or hidden.
6. **Customer contact:** Customer name, phone number or email. Displayed as a tappable/clickable link (opens WhatsApp or email client). No in-app messaging.
7. **Recommended next action label:** A short sentence naming the action OrderFlow recommends, e.g. "Accept this order to confirm it with the customer."
8. **Primary action button:** Large, prominent button labeled with the action (e.g. "Accept Order", "Mark as Processing", "Mark as Ready", "Mark as Shipped", "Mark as Completed"). Always visible without scrolling on a standard screen.
9. **Back navigation:** A clear way to return to the dashboard list.

---

## Look and Feel

*Source: `scope.md > Inspiration & Identity`*

**Overall style:** Clean, operational, fast. Closer to a focused task management tool (Linear, Things 3) than a cluttered e-commerce backend. The experience should communicate calm confidence — everything visible, nothing buried, the most important thing always obvious.

**Color palette:** Dark background (near-black or very dark grey). Surface cards in a lighter dark shade. Accent color for interactive elements (deep blue or electric blue). Priority colors are semantic and consistent throughout:
- Critical: red / rose
- High: orange / amber
- Medium: yellow
- Low: green

**Typography:** Clean, modern sans-serif (e.g. Inter or equivalent system font). Strong hierarchy: large numbers on stat cards, readable order rows, prominent action buttons. Nothing should require squinting.

**Status badges:** Pill-shaped, color-coded, always visible. Should be recognizable at a glance even when the list is long.

**Action buttons:** Decisive — large enough to tap, clearly labeled with the action (not a generic "Submit"), and visually primary (filled, not outlined). Only one primary action button per view.

**Tone:** Practical and direct. No marketing language. Labels say exactly what they mean: "Accept Order," "Mark as Shipped," "Customer has been waiting 2 hours."

---

## Features and Behavior

### Dashboard Summary Bar

*Source: `scope.md > The POC Boundary > Dashboard`*

Displays four stat cards at the top of the dashboard:

- **Total Orders:** Count of all orders in the system (all statuses).
- **Need Attention:** Count of orders with priority Critical or High that have not yet been completed.
- **Critical:** Count of Critical-priority orders.
- **High Priority:** Count of High-priority orders.

Acceptance criteria:
- [ ] All four counts are accurate and update immediately when an order status changes.
- [ ] "Need Attention" count is visually emphasized (colored or badged) when greater than zero.
- [ ] Counts reflect the current state of the order list without requiring a manual refresh.

### Priority Order List

*Source: `scope.md > The POC Boundary > Priority Order List`*

All orders appear in the list, sorted by priority level descending. Within the same level, older orders (by placed timestamp) appear first. The list is always visible on the dashboard; no filtering or tab switching is needed for the POC.

Each row contains:
- Priority badge (color-coded label)
- Order ID (e.g. #1042)
- Customer name
- Channel icon and label
- Current status
- Priority reason (the plain-English explanation, truncated to one line if long)
- A "View" or row-click action

Acceptance criteria:
- [ ] Orders with Critical priority always appear above High, High above Medium, Medium above Low.
- [ ] Within the same priority level, the oldest order (earliest placed timestamp) appears first.
- [ ] Priority badge color matches the level (red for Critical, orange for High, yellow for Medium, green for Low).
- [ ] Priority reason is readable and plain English on every row.
- [ ] Clicking any row opens the Order Detail View for that order.

### Order Detail View

*Source: `scope.md > The POC Boundary > Order Detail View`*

All six required elements are present and visible without scrolling on a standard laptop screen:

1. What the order is (items, qty, total)
2. Where it came from (channel)
3. Current status
4. Why it's prioritized (the Priority Reason box — always shown, never hidden)
5. Recommended next action label
6. Primary action button

Acceptance criteria:
- [ ] All six elements are present on every order detail view.
- [ ] The Priority Reason box is always visible and contains both the level and the plain-English reason.
- [ ] The primary action button label matches the recommended action and the current status step.
- [ ] The customer contact field renders as a tappable link (tel: for phone, mailto: for email).
- [ ] The back/close control returns the seller to the dashboard list without losing scroll position.

### Status Workflow

*Source: `scope.md > The POC Boundary > Status Workflow`*

Orders move through a fixed sequence of statuses. Each status has exactly one valid next status (no branching for the POC). The seller advances an order by clicking the primary action button.

| Current Status | Primary Action Button Label | Next Status |
|---|---|---|
| New | Accept Order | Accepted |
| Accepted | Mark as Processing | Processing |
| Processing | Mark as Ready for Delivery | Ready for Delivery |
| Ready for Delivery | Mark as Shipped | Shipped |
| Shipped | Mark as Completed | Completed |
| Completed | — (no further action) | — |

When an order reaches **Completed**, the action button is replaced with a "Completed" indicator. The order remains in the list at the bottom (Low priority / Completed) and is not deleted.

Acceptance criteria:
- [ ] Clicking the primary action button advances the order exactly one step in the sequence.
- [ ] The status badge on the order row and detail view updates immediately after the action.
- [ ] Completed orders display a visual completion state and no action button.
- [ ] The priority of the order is recalculated immediately after a status change (a newly accepted order may drop from High to Medium if the stall timer resets).
- [ ] The dashboard summary counts update immediately after any status change.

### Prioritization Engine

*Source: `scope.md > Prioritization Rules (POC)`, `scope.md > The Unique Kernel`*

Every order in the system is assigned a priority level and a plain-English reason. Priority is calculated automatically at load time and recalculated any time an order's status changes. The seller does not configure rules; sensible defaults are always active.

**Priority rules (evaluated in order; first match wins):**

| Rule | Priority | Example Reason |
|---|---|---|
| Order's expected fulfillment window is within 2 hours and not yet shipped | Critical | "Critical — order is approaching its fulfillment deadline." |
| Order has been in **New** status for more than 60 minutes | High | "High priority — new order has been waiting 1 hour for acceptance." |
| WhatsApp order has been in **New** status for more than 30 minutes | High | "High priority — WhatsApp customer has been waiting for a response." |
| Order has an issue flag (missing info or unconfirmed payment) | High | "High priority — order has a missing payment confirmation." |
| Order has been in the same non-terminal status for more than 3 hours | High | "High priority — order has been stalled in Processing for 4 hours." |
| Order is in **New** or **Accepted** status and placed within the last 60 minutes | High | "New order — action required." |
| Order is in any active (non-Completed) status with no flags | Medium | "Order is in progress." |
| Order is **Completed** | Low | "Order completed." |

Each order receives exactly one level and one plain-English reason. The reason is always shown alongside the level.

Acceptance criteria:
- [ ] Every order in the system has a priority level and a non-empty plain-English reason.
- [ ] Critical orders always surface above High orders in the list.
- [ ] Recalculation after a status change reflects the new state immediately (e.g. a New order accepted clears its "waiting" reason).
- [ ] Priority reasons are plain English — no error codes, no technical terms.
- [ ] An order cannot simultaneously hold two priority levels.

### Simulated Order Data

*Source: `scope.md > The POC Boundary > Simulated Order Data`, `scope.md > Explicitly Cut > Live Order Syncing`*

The system loads a pre-seeded set of realistic orders on first load. These orders span both channels, multiple statuses, and ages — giving the prioritization engine enough variety to demonstrate its logic visibly.

The demo seed data includes at minimum:

| Order | Channel | Status | Age | Expected Priority | Reason |
|---|---|---|---|---|---|
| #1042 — Chiamaka Osei | WhatsApp | New | 2 hours 10 min | Critical | Approaching fulfillment deadline and WhatsApp, unresponded |
| #1039 — Emeka Okafor | E-Commerce | New | 1 hour 15 min | High | New order waiting over 60 min |
| #1035 — Adaeze Nwosu | E-Commerce | Processing | 4 hours 30 min | High | Stalled in Processing |
| #1031 — Femi Adeyemi | E-Commerce | Accepted | 30 min | High | Missing payment confirmation flag |
| #1028 — Ngozi Eze | WhatsApp | Processing | 1 hour | Medium | In progress, on track |
| #1021 — Tunde Balogun | E-Commerce | Shipped | 2 hours | Medium | Shipped, awaiting completion |
| #1018 — Yetunde Afolabi | E-Commerce | Completed | Yesterday | Low | Completed |

A "Simulate New Order" button on the dashboard (or equivalent trigger) adds a new WhatsApp order in **New** status during the demo, so the viewer can watch a fresh order arrive and surface as High priority in real time.

Acceptance criteria:
- [ ] All seed orders load on first launch with correct statuses, channels, and ages.
- [ ] Each order's priority and reason are calculated and displayed correctly from the rules table above.
- [ ] The "Simulate New Order" trigger creates a new order that immediately appears in the list with correct priority.
- [ ] Seed data uses realistic Nigerian/African small-business names and products to reflect the target seller context.

### Contact Customer

*Source: `scope.md > The POC Boundary > Contact Customer Action`*

On the Order Detail View, the customer's contact information is displayed and rendered as a tappable link:
- Phone number → `tel:` link (opens phone dialer or WhatsApp on mobile)
- Email → `mailto:` link (opens email client)

For WhatsApp orders, a "Message on WhatsApp" link using the `https://wa.me/` deep link format is shown alongside the phone number.

No in-app messaging, chat thread, or conversation history is part of the POC.

Acceptance criteria:
- [ ] Clicking the phone number or WhatsApp link opens the system's default phone/messaging app.
- [ ] Clicking the email link opens the default email client.
- [ ] Contact links are present on every order's detail view.

---

## States and Boundaries

**Normal state (orders present):** The dashboard shows the full sorted list. Summary bar reflects current counts. At least one order is actionable.

**Empty state (no orders in system):** If the seed data is cleared or never loads, the order list shows a friendly empty message: "No orders yet. Use the 'Simulate New Order' button to see OrderFlow in action." The summary bar shows all zeros.

**All orders completed:** If every order reaches Completed status, the "Need Attention" count drops to zero and the list shows only completed (Low) orders. A message appears: "All orders are up to date — nothing needs attention right now."

**Order with an issue flag:** If an order has an issue flag (missing payment, missing address), the order row displays an issue indicator (e.g. ⚠️ icon). The Order Detail View shows the specific issue in the Priority Reason box.

**Status just changed:** After clicking the primary action button, the order status updates immediately in both the detail view and the list row. No loading delay. The priority and reason are recalculated immediately.

**Completed order:** Completed orders remain in the list at the bottom. Their row shows a "Completed" badge. The detail view shows no action button, only a completion indicator.

**Session persistence:** For the POC, order state (statuses, changes made during the session) persists for the duration of the browser session. Refreshing the page may reset to seed data — this is acceptable for the demo.

---

## The Happy-Path Demo Flow (60 Seconds)

*This is the exact sequence for the OrderFlow proof-of-concept demonstration.*

**0:00 — Open OrderFlow**
Dashboard loads. Summary bar shows: 7 Total Orders, 4 Need Attention, 1 Critical, 3 High.

**0:05 — Point out the dashboard**
The viewer sees the order list is already sorted — Critical at the top. Order #1042 (Chiamaka Osei) shows a red "Critical" badge: *"Critical — order is approaching its fulfillment deadline."*

**0:12 — Open the Critical order**
Click #1042. Order Detail View: 2x Ankara Print Dress, WhatsApp channel, status New. Priority Reason box is prominent: *"Critical — WhatsApp order is approaching its fulfillment deadline and has not been accepted."* Recommended action: "Accept this order immediately."

**0:20 — Take the action**
Click **"Accept Order."** Status updates instantly to Accepted. Dashboard counts update: 1 Critical → 0 Critical.

**0:25 — Back to dashboard**
Return to list. #1042 is now Accepted. #1039 (Emeka Okafor) has surfaced to the top: *"High priority — new order has been waiting over 1 hour for acceptance."*

**0:32 — Simulate a new order arriving**
Click "Simulate New Order." A new WhatsApp order appears at the top: *"High priority — new WhatsApp order requires your response."* The summary bar updates immediately.

**0:40 — Name the "wow" moment (narration)**
"I didn't scan through all those orders to decide what mattered. OrderFlow told me which order was critical, explained exactly why, and gave me the action to take. Now the next one is already surfacing."

**0:50 — Show a stalled order**
Briefly open #1035 (Adaeze Nwosu). Priority Reason: *"High priority — order has been stalled in Processing for 4 hours."* Show the "Mark as Ready for Delivery" button.

**0:58 — End**
Return to dashboard. Summary bar shows a clear queue improving. Close demo.

---

## Product Decisions

*Decisions made during the planning process, with reasons.*

- **Single seller, no login:** No authentication system for the POC. Keeps the build focused on the core loop and eliminates an entire category of complexity. Login is deferred.
- **Simulated channels, not live integrations:** WhatsApp and e-commerce channels are simulated via seed data. This removes all external API dependencies from the POC while preserving the architecture's extensibility — real integrations slot in at the same data entry point.
- **Rule-based prioritization, no ML:** Deterministic rules with explicit thresholds. Every priority recommendation is explainable, testable, and predictable. ML prioritization is deferred until real order data exists.
- **No in-app messaging:** "Contact customer" surfaces a link. The real-time messaging problem is explicitly out of scope.
- **Linear status progression, no branching:** Orders move forward through one fixed sequence. No "cancel," "return," or "refund" paths for the POC. This keeps the workflow understandable and the state machine simple.
- **State resets on refresh (POC acceptable):** Order state is held in memory for the session. Persistent storage is a spec and build decision; resetting on refresh is acceptable for the demo.
- **Simulated Nigerian/African small-business context:** Seed data uses realistic names and products from the target seller context, making the demo feel grounded in a real use case.

---

## What We're Building

The proof of concept must do all of the following:

- [ ] Dashboard with four summary stat cards (Total, Need Attention, Critical, High)
- [ ] Priority order list, sorted and color-coded, with plain-English reason on every row
- [ ] Order detail view with all six required elements always visible
- [ ] Status workflow: New → Accepted → Processing → Ready for Delivery → Shipped → Completed
- [ ] Primary action button that advances the order one step and updates immediately
- [ ] Prioritization engine with the 8-rule table, recalculating on every status change
- [ ] Simulated order seed data (7 orders minimum, both channels, varied statuses and ages)
- [ ] "Simulate New Order" trigger for the demo
- [ ] Contact customer: tel: and mailto: links; wa.me/ link for WhatsApp orders
- [ ] Priority reason always visible on both row and detail view

---

## Deferred From the POC

- **Real WhatsApp Business API:** The channel data structure is designed so this slots in; the API integration itself is out of scope.
- **Real e-commerce platform integration** (Shopify, WooCommerce, etc.): Same — simulated for now.
- **Persistent data storage:** Orders reset on refresh. A real database is a spec and build decision deferred past the demo.
- **Authentication and multi-seller accounts:** No login, no user management.
- **Configurable priority rules:** Thresholds (e.g. "60 minutes for High") are hardcoded for the POC. A settings UI is deferred.
- **Push or email notifications:** No alerts for new critical orders outside the app.
- **In-app messaging / chat thread:** Contact customer links out; no conversation history.
- **Cancel, return, or refund workflow:** Status sequence is forward-only for the POC.

---

## Non-Goals

- **Not a payment processor.** Payment status is a data field (confirmed / unconfirmed). No transactions.
- **Not a mobile app.** Web browser only. Responsive layout is acceptable; a native app is not in scope.
- **Not an inventory management system.** "Possible stock issue" may appear as a flag; no stock levels or SKU management.
- **Not a customer CRM.** Customer details are order-scoped. No customer history, repeat-buyer recognition, or contact database.
- **Not a reporting tool.** No analytics, charts, or fulfillment performance dashboard.

---

## Open Questions

- **Order detail layout — panel or full-page?** The Order Detail View can either replace the list (full-page navigation) or slide in as a right-side panel over the list. Both are reasonable for the POC. *Recommend panel for the demo (lets the viewer see the list and the detail simultaneously); resolve in `4-spec`.*
- **Priority recalculation timing:** Rules use order age (e.g. "waiting 60 minutes"). For the POC, age is calculated from the order's `placedAt` timestamp in the seed data, not a live clock. *This is acceptable for the demo; confirm in `4-spec`.*
- **"Simulate New Order" data:** The simulated new order should arrive pre-populated with realistic data (name, items, channel). Exact field values are a build detail, not a product decision.
