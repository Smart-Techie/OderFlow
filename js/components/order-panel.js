const actionMap = {
  "new": { label: "Accept Order", nextStatus: "accepted", recommend: "Accept this order immediately to confirm with the customer." },
  "accepted": { label: "Mark as Processing", nextStatus: "processing", recommend: "Start processing the items for this order." },
  "processing": { label: "Mark as Ready for Delivery", nextStatus: "ready", recommend: "Mark as ready once items are packed and waiting for delivery." },
  "ready": { label: "Mark as Shipped", nextStatus: "shipped", recommend: "Mark as shipped when handed over to the delivery partner." },
  "shipped": { label: "Mark as Completed", nextStatus: "completed", recommend: "Mark as completed once the customer has received it." }
};

export function renderOrderPanel(container, order, onActionClick) {
  if (!order) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Select an order to view details</p>
      </div>
    `;
    return;
  }

  const channelLabel = order.channel === 'whatsapp' ? '💬 WhatsApp' : '🛒 E-Commerce';
  const hasFlags = order.flags && order.flags.length > 0;
  
  // Format items
  const itemsHtml = order.items.map(item => `
    <div class="item-row">
      <div class="item-name">${item.qty}x ${item.name}</div>
      ${item.variant ? `<div class="item-variant">Variant: ${item.variant}</div>` : ''}
    </div>
  `).join('');

  // Contact links
  let contactHtml = '';
  if (order.customer.phone) {
    contactHtml += `<a href="tel:${order.customer.phone.replace(/[^+\d]/g, '')}" class="contact-link">📞 ${order.customer.phone}</a>`;
  }
  if (order.customer.whatsappNumber && order.channel === 'whatsapp') {
    contactHtml += `<a href="https://wa.me/${order.customer.whatsappNumber}" target="_blank" class="contact-link">💬 Message on WhatsApp</a>`;
  }
  if (order.customer.email) {
    contactHtml += `<a href="mailto:${order.customer.email}" class="contact-link">✉️ Email Customer</a>`;
  }

  // Action section
  const actionDef = actionMap[order.status];
  let actionHtml = '';
  if (actionDef) {
    actionHtml = `
      <div class="action-recommendation">
        <strong>Recommended:</strong> ${actionDef.recommend}
      </div>
      <button class="primary-action-btn" id="panel-action-btn">
        ${actionDef.label} &rarr;
      </button>
    `;
  } else if (order.status === 'completed') {
    actionHtml = `
      <div class="completed-state">
        ✅ Order Completed
      </div>
    `;
  }

  const html = `
    <div class="panel-content">
      <div class="panel-header">
        <div class="header-left">
          <span class="p-badge ${order.priority}">${order.priority}</span>
          <span class="header-title">${order.id}</span>
        </div>
        <div class="header-meta">
          ${channelLabel} · ${order.items.length} item(s) · ${order.currency}${order.total.toLocaleString()}
        </div>
      </div>
      
      <div class="panel-body">
        
        <!-- Why it's important -->
        <div class="reason-box ${order.priority}">
          <div class="reason-label">${order.priority}</div>
          <div class="reason-text">${order.priorityReason}</div>
        </div>

        <!-- Field Grid -->
        <div class="detail-section">
          <div class="field-grid">
            <div class="field">
              <span class="field-label">Current Status</span>
              <span class="field-value status">${order.status.replace('-', ' ')}</span>
            </div>
            <div class="field">
              <span class="field-label">Channel</span>
              <span class="field-value">${channelLabel}</span>
            </div>
            <div class="field" style="grid-column: 1 / -1;">
              <span class="field-label">Customer</span>
              <span class="field-value">${order.customer.name}</span>
              <div class="contact-links">${contactHtml}</div>
            </div>
          </div>
        </div>

        <!-- Items -->
        <div class="detail-section">
          <div class="detail-section-title">Order Items</div>
          <div class="items-list">
            ${itemsHtml}
            <div class="order-total-row">
              <span>Total</span>
              <span>${order.currency}${order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <!-- Next Action -->
        <div class="action-section">
          ${actionHtml}
        </div>

      </div>
    </div>
  `;

  container.innerHTML = html;

  // Wire action button
  const actionBtn = container.querySelector('#panel-action-btn');
  if (actionBtn && actionDef) {
    actionBtn.addEventListener('click', () => {
      onActionClick(order.id, actionDef.nextStatus);
    });
  }
}
