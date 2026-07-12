# Prospera AI - Simple & Smart Wealth Assistant 🚀
> Developed by Aritra Mondal for IDBI Innovate Hackathon '26 (Track 1: Digital Wealth Management System)

Prospera AI is a smart personal finance tool that helps bank customers plan their future wealth. It takes your income, monthly expenses, current savings, and financial goals to create a customized, step-by-step savings plan. 

Unlike ordinary calculators that show fake graphs, Prospera AI tells you the honest truth about your savings and helps you fix any budget shortages.



## ✨ Key Features

### 1. Honest Goal Tracker (Reality Check)
* **Real Projections:** If you cannot reach your goal on time with your current savings, the graph will honestly show the gap instead of pretending everything is perfect.
* **Smart Booster Advice:** It calculates and tells you the exact amount of extra money you need to save every month to meet your goal on time.

### 2. Simple Step-by-Step Plan
* **Phase 1 (Months 1-3):** Automatically calculates how much you need for an Emergency Fund (3 to 6 months of your expenses) and helps you build it first.
* **Phase 2 (Months 4-12):** Guides you to start investing based on your chosen risk level (Low, Medium, or High).
* **Phase 3 (Year 3+):** Tracks your progress and dynamically displays whether you have successfully reached your goal or are running short.

### 3. AI Wealth Coach
* **Friendly Financial Advice:** A chatbot that understands your personal budget, income, and goals to answer your questions.
* **Local Languages:** You can talk to the AI Coach in **English, Hindi, or Bengali**.
* **Clean Formatting:** The AI always replies in easy-to-read bullet points and uses Indian Rupees (₹).

### 4. Smooth User Experience
* **Light & Dark Mode:** A stylish theme switcher that changes colors instantly. The buttons and active menu items highlight beautifully in electric blue.
* **Sleek Mobile Menu:** Fully responsive design with a clean slide-out menu for mobile users.
* **Instant Loading:** Page transitions and calculations are optimized to load in just **400ms** for a snappy experience.



## 🛠️ Tech Stack & Tools
# 🖥️ Frontend (Client)
* **Frontend:** `HTML5, CSS3, Tailwind CSS` (for modern UI layout) and `style.css` (for theme overrides).
* **Chart.js:** To render interactive and beautiful growth graphs.
* **AI Engine:** Generative AI API (to power the smart multi-lingual AI Coach).
* **Icons:** Lucide Icons (clean and modern icons).

# ⚙️ Backend (Server - `server.js`)
* **Runtime Environment:** Node.js with Express framework.
* **Core API Endpoint:** `POST /api/chat`
  * **Payload:** Receives the user's secure financial data profile (`userFinancialProfile`) alongside the current chat prompt string.
  * **Processing:** Securely forwards the tokenized payload to the Generative AI API orchestration layer.
  * **Language Context Engine:** System prompt anchors ensure the response is auto-translated into Hindi, Bengali, or English based on user input, and formatted strictly in markdown using Indian Rupees (₹).
* **Security & Middleware:** Implements CORS handlers and JSON parsers for secure local data transactions.




## 📁 Project Files

```text
├── index.html          # Main website dashboard, forms, and tabs
├── style.css           # Theme colors, layouts, and dark mode styles
├── app.js              # Calculations, charts, and navigation logic
├── server.js           # AI response & backend
└── README.md           # This project guide file
```
🚀 How to Run the Project Locally
Download/Clone the code:

```bash
git clone https://github.com/ArixenX/Prospera-AI.git
cd prospera-ai

# Install the exact backend packages needed
npm install express cors

# Start the Node.js backend server
node server.js
```
_The server will start running locally at http://localhost:3000_

Backend Chat Endpoint:
The AI Coach connects to the /api/chat route to send financial data and receive localized smart advice.

>📝 Developer Testing Tip
_To save you time during testing, app.js has a developer bypass block. It auto-fills the form with demo details and skips directly to the active dashboard within 300ms of page load._

```
// ========================================================
// DEVELOPER AUTOMATION: AUTO-FILL & BYPASS FORM ON REFRESH
// ========================================================
(function() {
    function autoFillAndBypass() {
        // Checking if data is already filled to prevent infinite loop
        if (window.hasCalculatedDataBefore) return;

        console.log("⚡ Dev Automation Active: Auto-filling form fields...");

        // Targeting form fields securely
        const nameField = document.getElementById('prof-name');
        const ageField = document.getElementById('prof-age');
        const jobField = document.getElementById('prof-job');
        const incomeField = document.getElementById('prof-income');
        const expensesField = document.getElementById('prof-expenses');
        const savingsField = document.getElementById('prof-savings');
        const goalField = document.getElementById('prof-goal');
        const targetField = document.getElementById('prof-target');
        const timelineField = document.getElementById('prof-timeline');

        // If inputs exist on the current screen, fill them with simple test data
        if (nameField && incomeField && targetField) {
            nameField.value = "Aritra Mondal";
            ageField.value = "22";
            jobField.value = "Cybersecurity Expert";
            incomeField.value = "100000";
            expensesField.value = "40000";
            savingsField.value = "50000";
            
            // Selecting goal and target values
            goalField.value = "Buy House"; 
            targetField.value = "2000000"; 
            timelineField.value = "36"; 

            // Setting up the risk radio button profile style
            const medRisk = document.querySelector('input[name="risk"][value="Medium"]');
            if (medRisk) medRisk.checked = true;

            // Mock profile object configuration for calculation engine
            window.userFinancialProfile = {
                name: "Aritra Mondal", age: 22, job: "Cybersecurity Expert",
                income: 100000, expenses: 40000, savings: 50000, loans: 0,
                goal: "Buy House", target: 2000000, timeline: 36, risk: "Medium"
            };

            window.hasCalculatedDataBefore = true;

            // Triggering the built-in mathematical processing rules
            if (typeof computeFinancialAnalytics === 'function') {
                computeFinancialAnalytics();
            }
            
            // Snappy navigation switch redirecting straight to dashboard tab view
            if (typeof navigateTo === 'function') {
                navigateTo('dashboard');
            }
            console.log("🎯 Successfully entered Dashboard automatically!");
        }
    }

    // Runs exactly after 300ms of page load as described in README
    window.addEventListener('load', () => {
        setTimeout(autoFillAndBypass, 300);
    });
})();
```
(Remember to remove or comment out this automated block from the bottom of app.js before submitting your final project to real users!)

# Author
[@Aritra](https://github.com/ArixenX)
