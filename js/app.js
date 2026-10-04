import { seedOrders, SEED_REFERENCE_TIME } from './data/orders.js';
import { calculatePriority } from './engine/priority.js';
import { renderOrderList } from './components/order-list.js';
import { renderOrderPanel } from './components/order-panel.js';

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
  // Will be fully implemented in Slice 3
  console.log(`Action clicked for ${orderId}, transition to ${nextStatus}`);
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
