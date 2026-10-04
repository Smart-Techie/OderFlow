export function renderOrderList(container, orders, selectedOrderId, onOrderSelect) {
  if (orders.length === 0) {
    container.innerHTML = `
      <div class="order-list-header">Queue (0)</div>
      <div class="empty-state" style="padding: 20px; text-align: center;">
        <p>No orders yet. Use 'Simulate New Order' to see OrderFlow in action.</p>
      </div>
    `;
    return;
  }

  const headerHtml = `<div class="order-list-header">Queue (${orders.length})</div>`;
  
  const rowsHtml = orders.map(order => {
    const isSelected = order.id === selectedOrderId;
    const channelIcon = order.channel === 'whatsapp' ? '💬' : '🛒';
    const hasFlags = order.flags && order.flags.length > 0;
    
    return `
      <div class="order-row ${isSelected ? 'selected' : ''}" data-id="${order.id}">
        <div class="row-top">
          <div class="row-identity">
            <span class="p-badge ${order.priority}">${order.priority}</span>
            <span class="order-id">${order.id}</span>
            ${hasFlags ? '⚠️' : ''}
          </div>
          <span class="channel-icon" title="${order.channel}">${channelIcon}</span>
        </div>
        <div class="customer-name">${order.customer.name}</div>
        <div class="priority-reason">${order.priorityReason}</div>
        <div class="row-bottom">
          <span class="status-label">${order.status.replace('-', ' ')}</span>
          <button class="view-btn">View &rarr;</button>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = headerHtml + rowsHtml;

  // Add event listeners to rows
  const rows = container.querySelectorAll('.order-row');
  rows.forEach(row => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-id');
      onOrderSelect(id);
    });
  });
}
