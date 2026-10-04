---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. The Prioritized Order List**
  Becomes usable: The seller can open the app and see the prioritized order queue sorted correctly with plain-English reasons.
  Why now: This proves the "unique kernel" (the automatic priority engine and reason generation) immediately, giving us a foundation to build the rest on.
  PRD ref: `prd.md > The Core Journey` (steps 1-3), `prd.md > Priority Order List`, `prd.md > Prioritization Engine`
  Spec ref: `spec.md > Components` (Seed Data, Priority Engine, App State, Order List), `spec.md > File Structure`
  Build: Scaffold the project (`index.html`, `css/base.css`, `css/layout.css`, `css/order-list.css`). Build `js/data/orders.js` with the seed data. Build `js/engine/priority.js` for the rules. Wire it in `js/app.js` and render the list in `js/components/order-list.js`.
  Verify (mechanical): Open `index.html` in a browser. Confirm that orders render and the top order is Critical with the correct reason.
  Learner check: Open `index.html` in your browser. Look at the top order and confirm you see the "Critical" badge and the explanation for why it needs attention.
  Commit: `Add priority engine and order list UI`

- [x] **2. The Order Detail Panel**
  Becomes usable: The seller can select an order to see its full details and recommended action in the right panel without losing sight of the queue.
  Why now: Closes the "Understand" part of the loop. We need to see the details and action recommendation before we can actually perform the action.
  PRD ref: `prd.md > Order Detail View`, `prd.md > Contact Customer`
  Spec ref: `spec.md > Components` (Order Detail Panel)
  Build: Build `js/components/order-panel.js` and `css/order-panel.css`. Update `app.js` and `order-list.js` to handle row clicks and selected state. Handle the contact links (tel/mailto/wa.me).
  Verify (mechanical): Click an order row; verify the right panel populates with all six PRD elements and the primary action button label matches the current status.
  Learner check: Click order #1042 in the list. Confirm the right panel opens, stays open, and clearly shows the recommended "Accept Order" action.
  Commit: `Add order detail panel and selection state`

- [ ] **3. Taking Action and Updating State**
  Becomes usable: The seller can click the action button to advance the order, which instantly updates its status, recalculates its priority, and updates the dashboard summary counts.
  Why now: This completes the "Act" part of the core loop and proves the state updates correctly.
  PRD ref: `prd.md > Status Workflow`, `prd.md > Dashboard Summary Bar`
  Spec ref: `spec.md > Components` (Dashboard Summary Bar)
  Build: Build `js/components/dashboard.js`. Add the action handler in `app.js` that updates the status, updates `lastStatusChangedAt`, recalculates all priorities, re-sorts, and re-renders both the list and detail views.
  Verify (mechanical): Click "Accept Order" on a New order. Verify the order status changes, priority recalculates, and dashboard counts update immediately.
  Learner check: Open the critical order (#1042) and click "Accept Order." Confirm that the dashboard updates, the critical order drops in priority, and the next most important order rises to the top.
  Commit: `Implement status workflow and dashboard counts`

- [ ] **4. The "Simulate New Order" Demo Trigger**
  Becomes usable: The seller can trigger a new incoming order to watch how OrderFlow catches it and flags it for attention.
  Why now: Completes the required 60-second happy-path demo flow described in the PRD.
  PRD ref: `prd.md > The Happy-Path Demo Flow (60 Seconds)`
  Spec ref: `spec.md > Components` (App State - simulate order)
  Build: Add the "Simulate New Order" button to the UI. Add a function in `app.js` to inject a new seed order into state and trigger a re-render.
  Verify (mechanical): Click the simulate button; verify the new WhatsApp order appears at the top with High priority.
  Learner check: Click "Simulate New Order" and find the newly surfaced WhatsApp order at the top of the queue.
  Commit: `Add new order simulation for demo`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — End of Slice 2 (Order selection visible)
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: 
Route and stops: 
Edit outcome: 
Reflection: 
Activity mode: 

## Revisions
