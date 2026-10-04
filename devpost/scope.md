---
doc: scope
status: approved
---

# OrderFlow

An AI-powered order operations assistant for small businesses and e-commerce sellers — one place to see all orders, understand what needs attention, and take the next action.

## The Unique Kernel

Most order dashboards show you everything and let you figure out what matters. OrderFlow inverts that: it reads the current state of every order, automatically determines its priority using built-in rules, and surfaces a plain-language explanation and a recommended next action. The seller doesn't scan — they respond. The key experience is: *"I didn't have to scan through all these orders myself. OrderFlow told me exactly what needed my attention and what to do next."*

## Who It's For

A small business owner or solo e-commerce seller who receives orders from both an online store and WhatsApp. They're managing orders manually today — switching between a website backend, a WhatsApp thread, and maybe a spreadsheet — and spending more time figuring out what to do next than actually doing it.

## The Core Loop

The seller opens OrderFlow and sees a dashboard: total orders, how many need attention, the critical and high-priority ones, and the top recommended action. They pick the most urgent order — or let OrderFlow surface it — and see, for each order:

1. **What the order is** — items, quantity, total.
2. **Where it came from** — e-commerce website or WhatsApp.
3. **Its current status** — where it sits in the workflow.
4. **Why OrderFlow considers it important** — a plain-English reason.
5. **The recommended next action** — what to do right now.
6. **A clear button to perform that action** — one click, no guessing.

They take the guided action. The order status updates immediately, and the next recommended action appears. They repeat until the queue is clear.

## Prioritization Rules (POC)

Built-in, sensible defaults — no configuration required. Rules are deterministic for the POC; the system is designed so they become configurable later.

| Rule | Priority |
|---|---|
| New order requiring seller action | High |
| Order waiting too long for seller response | High |
| Order stalled in the same status too long | High |
| Order approaching a time-sensitive fulfillment deadline | Critical |
| Order with a missing information or payment flag | High |
| WhatsApp order with no response yet | High |
| Normal in-progress order, on track | Low / Medium |

Each order receives a level (Critical / High / Medium / Low) and a one-line plain-English reason:
> *"High priority — customer has been waiting 2 hours for confirmation."*
> *"Critical — order is approaching its fulfillment deadline."*

## Inspiration & Identity

Clean, fast, and operational — closer to a well-designed task management tool (Linear, Things 3) than a cluttered e-commerce backend. Calm confidence: everything is visible, nothing is buried, the most important thing is always obvious. Dark or neutral tones, clear hierarchy, status badges with color coding, action buttons that feel decisive.

## Why This Matters to the Learner

This came from a real frustration observed while working on e-commerce and business projects: small sellers juggling orders from multiple channels with no unified view. OrderFlow is an experiment in whether one intelligent assistant can genuinely simplify that — and a vehicle for practicing the full idea-to-MVP workflow with a plan-first, spec-driven approach.

## What "Working" Looks Like

A 60-second screen recording shows:
1. The seller opens OrderFlow. Several orders are visible from both simulated channels.
2. OrderFlow automatically identifies one or two orders needing attention — with a plain-English explanation of why.
3. The seller clicks the recommended action.
4. The order status changes.
5. The dashboard updates and the next important order surfaces.

The "that's genuinely useful" moment: the seller never had to scan the whole list and decide what mattered. OrderFlow already knew.

## The POC Boundary

- **Dashboard**: total orders, attention-needed count, critical/high priority count, top recommended actions.
- **Priority order list**: sorted Critical → High → Medium → Low, each with a one-line reason.
- **Order detail view**: all six elements above (what, where, status, why, next action, action button).
- **Status workflow**: New → Accepted → Processing → Ready for Delivery → Shipped → Completed.
- **Auto-prioritization engine**: rule-based, deterministic, built-in defaults (see table above). Configurable later.
- **Contact customer action**: surfaces WhatsApp number or email as a tappable link. No in-app messaging.
- **Simulated order data**: realistic pre-seeded orders from both channels — stalled orders, waiting orders, deadline-approaching orders, and normal in-progress ones — so the engine has something meaningful to surface on first load.

## Later

- Real WhatsApp Business API integration (designed to slot in where the mock channel lives).
- Real e-commerce platform integrations (Shopify, WooCommerce, or similar).
- Configurable priority rules — sellers can adjust thresholds and add custom rules.
- AI/ML smarter prioritization trained on real order history.
- Push or email notifications when a new critical order arrives.
- Order analytics and fulfillment performance reporting.
- Multi-user or team access with roles.
- Customer order history and repeat-buyer recognition.

## Explicitly Cut

- **Real payment processing** — payment status is a data field only; no transactions handled in POC.
- **In-app messaging / chat** — "contact customer" links out; no conversation thread. Removes the real-time messaging problem entirely.
- **Live order syncing / webhooks** — orders are seeded or manually triggered; no external platform dependencies.
- **Mobile app** — web browser only. Responsive layout is fine; a dedicated app is later.
- **Multi-seller accounts / login** — single seller, no auth. Keeps build focused on the core order operations loop.
- **Configurable priority rules** — sensible defaults are built in; configuration UI is explicitly later.
