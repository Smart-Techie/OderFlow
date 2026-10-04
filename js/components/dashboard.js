export function renderDashboard(container, orders) {
  const activeOrders = orders.filter(o => o.status !== 'completed');
  const criticalCount = activeOrders.filter(o => o.priority === 'critical').length;
  const highCount = activeOrders.filter(o => o.priority === 'high').length;
  const attentionCount = criticalCount + highCount;
  const totalCount = orders.length;

  const html = `
    <div class="summary-grid">
      <div class="summary-card">
        <span class="s-label">Total Orders</span>
        <span class="s-value">${totalCount}</span>
      </div>
      <div class="summary-card ${attentionCount > 0 ? 'attention' : ''}">
        <span class="s-label">Need Attention</span>
        <span class="s-value">${attentionCount}</span>
      </div>
      <div class="summary-card ${criticalCount > 0 ? 'critical' : ''}">
        <span class="s-label">Critical</span>
        <span class="s-value">${criticalCount}</span>
      </div>
      <div class="summary-card">
        <span class="s-label">High Priority</span>
        <span class="s-value">${highCount}</span>
      </div>
    </div>
  `;

  container.innerHTML = html;
}
