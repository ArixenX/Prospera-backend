# Prospera AI — Backend Engine [IDBI Bank Hackathon]

This repository contains the robust server-side execution pipeline, secure AI orchestration layer, and fail-safe API routing infrastructure for Prospera AI, engineered for the IDBI Innovate Hackathon under Track 1: Digital Wealth Management System. The application processes structured user financial context payloads and hooks directly into advanced generative models to deliver enterprise-grade digital wealth coaching.


🚀 Live Production Deployment

* **Production Hosted URL:** https://prospera-backend-4isr.onrender.com/ (Hosted via Render Web Services)
* **Core Architecture:** Decoupled serverless container layout processing asynchronous state streams securely isolated from client-side vector exposures.



🌟 Premium Features & Technical Scope

🔒 Isolated Credentials & Secure Variable Layer
* The execution architecture isolates the `GEMINI_API_KEY` strictly inside the cloud environment runtime configurations (`process.env`), preventing cross-origin token harvesting or client-side reverse engineering.

🛡️ Fail-Safe Runtime Pipeline & Crash Protection
* Engineered with advanced runtime logic guards that intercept structural anomalies or missing pipeline keys gracefully, delivering strategic HTTP `500 Config Missing` messages without crashing the core execution thread.

🧠 Context-Aware Financial Prompt Engineering
* Captures client metrics (Income, Expenses, Goal timelines) and packages them into high-context structured semantic layouts, transforming raw API prompts into a private digital financial consultant instance.

📡 Optimized Cross-Origin Request Handlers
* Configured with adaptive CORS middleware profiles ensuring seamless, low-latency cross-origin fetch requests from hosted frontend interfaces while keeping endpoints strictly managed.



📁 Repository Directory Structure

* **server.js** — The centralized server runtime script managing Express initializations, CORS integration filters, secure Gemini API orchestration wrappers, and request payload validation routes.
* **package.json** — The production dependency manifest locking explicit SDK library versions (`@google/generative-ai`) and runtime execution profiles to secure build environment permanence.


🛠️ Local Configuration & Initialization

To clone, set up, and evaluate the server-side infrastructure execution engine locally inside your development workspace:

1. Clone this backend repository code asset locally to your environment:
   
   ```bash
   git clone https://github.com/ArixenX/Prospera-backend.git
   cd Prospera-backend
2. Install the locked production dependency trees via the node package manager:

  ```bash
  npm install
  ```

  Configure a secure local environment variable token cache (.env) inside the project root directory:

 3. Code snippet
  ```GEMINI_API_KEY=your_private_google_ai_studio_api_key
  Launch the local development node server instance on the configured network channel (Port 3000):
  ```

  ```bash
  node server.js
  ```
🌍 Global Production Cloud Deployment Pipeline

_This backend service build is fully fine-tuned to be compiled on Render with automated semantic integration tracking:_

_Access your personal Render cloud management dashboard interface console (dashboard.render.com)._

_Trigger the creation workflows for a brand new Web Service resource configuration container mapping._

_Authenticate and select your newly deployed GitHub repository target (Prospera-backend) to initialize the deployment hooks._

_Input the following structural properties to frame the build environment pipeline correctly:_ _

_Runtime System Profile:_ Node

_Build Pipeline Routine:_ npm install

_Start Execution Instruction:_ node server.js

_Inject the secure credential values inside the Environment Variables configuration blade using the explicit key mapping name:_ GEMINI_API_KEY.

_Select the deployment trigger to instantly compile your secure, production-grade cloud container array._

# Author
[@Aritra](https://github.com/ArixenX)
