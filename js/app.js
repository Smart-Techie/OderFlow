import { seedOrders, SEED_REFERENCE_TIME } from './data/orders.js';
import { calculatePriority } from './engine/priority.js';
import { renderOrderList } from './components/order-list.js';
import { renderOrderPanel } from './components/order-panel.js';
import { renderDashboard } from './components/dashboard.js';

// App State
const state = {
  orders: [],
  selectedOrderId: null
};

// Priority Weight Mapping for sorting
const priorityWeight = {
  "critical": 4,
  "high": 3,
  "medium": 2,
  "low": 1
};

// Initialization
function init() {
  // Deep clone seed orders to avoid mutating the original data
  state.orders = seedOrders.map(order => ({
    ...order,
    customer: { ...order.customer },
    items: order.items.map(item => ({ ...item })),
    flags: [...order.flags]
  }));

  updatePrioritiesAndSort();
  render();
  
  // Wire Simulate Button
  const simBtn = document.getElementById('simulate-btn');
  if (simBtn) {
    simBtn.addEventListener('click', handleSimulate);
  }
}

// Runs priority engine on all orders and sorts them
function updatePrioritiesAndSort() {
  state.orders.forEach(order => {
    const { priority, priorityReason } = calculatePriority(order, SEED_REFERENCE_TIME);
    order.priority = priority;
    order.priorityReason = priorityReason;
  });

  // Sort: highest priority first, then oldest first
  state.orders.sort((a, b) => {
    const weightA = priorityWeight[a.priority];
    const weightB = priorityWeight[b.priority];
    
    if (weightA !== weightB) {
      return weightB - weightA; // Descending weight
    }
    
    // If same priority, oldest placedAt first
    return a.placedAt.getTime() - b.placedAt.getTime();
  });
}

// Render the application UI
function render() {
  // Render Top Summary Bar
  const summaryContainer = document.getElementById('summary-bar-container');
  renderDashboard(summaryContainer, state.orders);

  // Render Left Panel: Order List
  const listContainer = document.getElementById('order-list-container');
  renderOrderList(listContainer, state.orders, state.selectedOrderId, handleOrderSelect);
  
  // Render Right Panel: Order Detail
  const detailContainer = document.getElementById('order-detail-container');
  const selectedOrder = state.orders.find(o => o.id === state.selectedOrderId);
  renderOrderPanel(detailContainer, selectedOrder, handleActionClick);
}

// Action Handlers
function handleOrderSelect(orderId) {
  state.selectedOrderId = orderId;
  render();
}

function handleActionClick(orderId, nextStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (order) {
    // Advance status
    order.status = nextStatus;
    
    // Simulate current time as the reference time so priority engine works correctly for the POC
    order.lastStatusChangedAt = SEED_REFERENCE_TIME;
    
    // If completed, clear selection to show empty state, or keep it to see completed view. 
    // We'll keep it so they can see "Order Completed" in the panel.
    
    // Recalculate priorities and re-sort the queue
    updatePrioritiesAndSort();
    
    // Re-render everything
    render();
  }
}

let simCounter = 1;

function handleSimulate() {
  // Create a new WhatsApp order that arrived "just now" (relative to SEED_REFERENCE_TIME)
  const newOrder = {
    id: `#200${simCounter++}`,
    customer: { name: "Simulated Customer", phone: "+234 800 000 0000", email: null, whatsappNumber: "2348000000000" },
    items: [
      { name: "Demo Product", qty: 1, variant: "Blue" }
    ],
    total: 5000,
    currency: "₦",
    channel: "whatsapp",
    status: "new",
    placedAt: SEED_REFERENCE_TIME,
    expectedBy: new Date(SEED_REFERENCE_TIME.getTime() + 24 * 60 * 60 * 1000),
    lastStatusChangedAt: SEED_REFERENCE_TIME,
    flags: []
  };

  state.orders.push(newOrder);
  updatePrioritiesAndSort();
  render();
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
