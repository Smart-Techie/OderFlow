// This is the simulated reference time for the POC, so age calculations are predictable.
// Treat this as "now" in the priority engine.
export const SEED_REFERENCE_TIME = new Date("2026-10-04T12:00:00Z");

const twoHoursAgo = new Date(SEED_REFERENCE_TIME.getTime() - 2 * 60 * 60 * 1000);
const oneHourFifteenAgo = new Date(SEED_REFERENCE_TIME.getTime() - 75 * 60 * 1000);
const fourHoursThirtyAgo = new Date(SEED_REFERENCE_TIME.getTime() - 270 * 60 * 1000);
const thirtyMinsAgo = new Date(SEED_REFERENCE_TIME.getTime() - 30 * 60 * 1000);
const oneHourAgo = new Date(SEED_REFERENCE_TIME.getTime() - 60 * 60 * 1000);
const yesterday = new Date(SEED_REFERENCE_TIME.getTime() - 24 * 60 * 60 * 1000);

export const seedOrders = [
  {
    id: "#1042",
    customer: { name: "Chiamaka Osei", phone: "+234 803 555 0192", email: null, whatsappNumber: "2348035550192" },
    items: [
      { name: "Ankara Print Dress", qty: 2, variant: "M" }
    ],
    total: 18500,
    currency: "₦",
    channel: "whatsapp",
    status: "new",
    placedAt: twoHoursAgo,
    expectedBy: new Date(SEED_REFERENCE_TIME.getTime() + 1 * 60 * 60 * 1000), // Deadline in 1 hour
    lastStatusChangedAt: twoHoursAgo,
    flags: []
  },
  {
    id: "#1039",
    customer: { name: "Emeka Okafor", phone: "+234 812 555 0843", email: "emeka.o@example.com", whatsappNumber: null },
    items: [
      { name: "Leather Sandals", qty: 1, variant: "42" }
    ],
    total: 12000,
    currency: "₦",
    channel: "ecommerce",
    status: "new",
    placedAt: oneHourFifteenAgo,
    expectedBy: new Date(SEED_REFERENCE_TIME.getTime() + 24 * 60 * 60 * 1000),
    lastStatusChangedAt: oneHourFifteenAgo,
    flags: []
  },
  {
    id: "#1035",
    customer: { name: "Adaeze Nwosu", phone: "+234 809 555 0991", email: "ada.n@example.com", whatsappNumber: null },
    items: [
      { name: "Custom T-Shirt", qty: 5, variant: "L" }
    ],
    total: 25000,
    currency: "₦",
    channel: "ecommerce",
    status: "processing",
    placedAt: fourHoursThirtyAgo,
    expectedBy: new Date(SEED_REFERENCE_TIME.getTime() + 48 * 60 * 60 * 1000),
    lastStatusChangedAt: fourHoursThirtyAgo, // Stalled for 4.5 hours
    flags: []
  },
  {
    id: "#1031",
    customer: { name: "Femi Adeyemi", phone: "+234 802 555 0122", email: "femi@example.com", whatsappNumber: null },
    items: [
      { name: "Wireless Earbuds", qty: 1, variant: "Black" }
    ],
    total: 35000,
    currency: "₦",
    channel: "ecommerce",
    status: "accepted",
    placedAt: thirtyMinsAgo,
    expectedBy: new Date(SEED_REFERENCE_TIME.getTime() + 24 * 60 * 60 * 1000),
    lastStatusChangedAt: thirtyMinsAgo,
    flags: ["missing_payment"]
  },
  {
    id: "#1028",
    customer: { name: "Ngozi Eze", phone: "+234 805 555 0761", email: null, whatsappNumber: "2348055550761" },
    items: [
      { name: "Kente Scarf", qty: 1, variant: null }
    ],
    total: 8500,
    currency: "₦",
    channel: "whatsapp",
    status: "processing",
    placedAt: oneHourAgo,
    expectedBy: new Date(SEED_REFERENCE_TIME.getTime() + 48 * 60 * 60 * 1000),
    lastStatusChangedAt: thirtyMinsAgo,
    flags: []
  },
  {
    id: "#1021",
    customer: { name: "Tunde Balogun", phone: "+234 814 555 0333", email: "tunde.b@example.com", whatsappNumber: null },
    items: [
      { name: "Canvas Backpack", qty: 1, variant: "Navy" }
    ],
    total: 15000,
    currency: "₦",
    channel: "ecommerce",
    status: "shipped",
    placedAt: twoHoursAgo,
    expectedBy: new Date(SEED_REFERENCE_TIME.getTime() + 72 * 60 * 60 * 1000),
    lastStatusChangedAt: oneHourAgo,
    flags: []
  },
  {
    id: "#1018",
    customer: { name: "Yetunde Afolabi", phone: "+234 811 555 0444", email: "yetty@example.com", whatsappNumber: null },
    items: [
      { name: "Beaded Necklace", qty: 2, variant: null }
    ],
    total: 9000,
    currency: "₦",
    channel: "ecommerce",
    status: "completed",
    placedAt: yesterday,
    expectedBy: yesterday,
    lastStatusChangedAt: yesterday,
    flags: []
  }
];
