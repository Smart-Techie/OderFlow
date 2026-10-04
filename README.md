# OrderFlow

A smart order operations dashboard designed to help businesses prioritize urgent orders, identify orders requiring attention, and take action quickly.

## Hackathon Prototype

This repository contains a frontend Proof of Concept using simulated order data. No production backend is included.

## Key Features
- Priority-based order queue
- Critical order detection
- High-priority order detection
- Need Attention filtering
- Interactive dashboard summary cards
- Order detail panel
- Recommended next action
- Accept Order workflow
- Customer contact/WhatsApp action
- Responsive dashboard interface

## How It Works
1. Orders enter the queue.
2. Orders are prioritized according to urgency.
3. The dashboard highlights Critical and High Priority orders.
4. The operator can filter the queue.
5. Selecting an order opens its details.
6. The operator receives a recommended action.
7. The operator can accept the order and continue processing.

## Technology
- HTML5
- CSS3 (Vanilla)
- ES6 JavaScript (Modules)

## Running Locally
Because this project uses JavaScript ES6 Modules, it must be run on a local development server (opening the file directly in a browser via `file://` will not work due to CORS restrictions).

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/orderflow.git
   cd orderflow
   ```
2. Start a local server. If you have Python installed, you can use:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to `http://localhost:8000`.

## Project Structure
- `index.html`: The main entry point for the dashboard.
- `css/`: Contains the modular styling system (`base.css` for tokens/colors, `layout.css`, and specific component styles).
- `js/app.js`: The main application controller and state manager.
- `js/engine/priority.js`: The business logic that determines order urgency based on time and status.
- `js/components/`: Modular UI rendering functions.
- `js/data/orders.js`: The isolated mock data module acting as a seed database.
- `devpost/`: Contains the architecture planning documents and application mapping for the hackathon submission.

## Prototype Limitations
- Uses simulated/mock order data.
- No production backend.
- No real payment processing.
- No real order database.
- No real authentication.
- Intended as a hackathon Proof of Concept.

## Future Development
- Backend/database integration
- Real order ingestion via eCommerce platforms (e.g. Shopify, WooCommerce)
- Real WhatsApp Business API integration
- Authentication and role-based access
- Real-time order updates (WebSockets)
- Notifications
- Analytics and reporting
- Integration with third-party logistics/shipping providers
