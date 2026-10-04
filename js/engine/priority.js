export function calculatePriority(order, referenceTime) {
  const refTimeMs = referenceTime.getTime();
  
  const ageMinutes = (refTimeMs - order.placedAt.getTime()) / 60000;
  const stallMinutes = (refTimeMs - order.lastStatusChangedAt.getTime()) / 60000;
  
  let hoursToDeadline = Infinity;
  if (order.expectedBy) {
    hoursToDeadline = (order.expectedBy.getTime() - refTimeMs) / 3600000;
  }

  const isTerminal = order.status === "completed";

  // Rule 1: Deadline within 2h + not shipped/completed -> Critical
  if (hoursToDeadline <= 2 && order.status !== "shipped" && !isTerminal) {
    return {
      priority: "critical",
      priorityReason: "Critical — order is approaching its fulfillment deadline."
    };
  }

  // Rule 2: New order waiting > 60 min -> High
  if (order.status === "new" && ageMinutes > 60) {
    return {
      priority: "high",
      priorityReason: "High priority — new order has been waiting over 1 hour for acceptance."
    };
  }

  // Rule 3: WhatsApp order New > 30 min -> High
  if (order.channel === "whatsapp" && order.status === "new" && ageMinutes > 30) {
    return {
      priority: "high",
      priorityReason: "High priority — WhatsApp customer has been waiting for a response."
    };
  }

  // Rule 4: Issue flag -> High
  if (order.flags && order.flags.length > 0) {
    const flag = order.flags[0];
    let reason = "High priority — order requires attention.";
    if (flag === "missing_payment") reason = "High priority — order has a missing payment confirmation.";
    if (flag === "missing_info") reason = "High priority — order is missing customer information.";
    return {
      priority: "high",
      priorityReason: reason
    };
  }

  // Rule 5: Same non-terminal status > 3 hrs (180 mins) -> High
  if (!isTerminal && stallMinutes > 180) {
    const capitalizedStatus = order.status.charAt(0).toUpperCase() + order.status.slice(1);
    return {
      priority: "high",
      priorityReason: `High priority — order has been stalled in ${capitalizedStatus} for over 3 hours.`
    };
  }

  // Rule 6: New/Accepted placed within 60 min -> High
  if ((order.status === "new" || order.status === "accepted") && ageMinutes <= 60) {
    return {
      priority: "high",
      priorityReason: "New order — action required."
    };
  }

  // Rule 7: Completed -> Low
  if (isTerminal) {
    return {
      priority: "low",
      priorityReason: "Order completed."
    };
  }

  // Rule 8: Default active
  return {
    priority: "medium",
    priorityReason: "Order is in progress."
  };
}
