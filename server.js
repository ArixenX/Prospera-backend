const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Strict configuration bridge setup
const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/chat', async (req, res) => {
    try {
        if (!apiKey) {
            return res.status(500).json({ error: "Backend config missing: API Key not found." });
        }

        const { message, financialData } = req.body;
        const fd = financialData || {};

        const contextPrompt = `
You are Prospera AI Assistant, an expert digital financial coach.
Context: Name=${fd.name || "User"}, Income=${fd.income || "0"}, Expenses=${fd.expenses || "0"}

Strict Output Formatting Rules:
1. NEVER use double asterisks (**) or triple asterisks (***) for bold text. It breaks the UI.
2. Separate your paragraphs properly. Add a clear empty line after every 2-3 sentences.
3. Use a simple dot (•) or a clean dash (-) for lists and points. Do not use asterisks (*) for lists.
4. Keep the response neat, properly spaced, and always use Indian Rupees (₹) for money values.

Question: ${message}
`;

        // FIXED: Explicitly string specifications control karne ke liye direct wrapper load
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        // Hard pipeline routing fix via standard text generation
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: contextPrompt }] }]
        });

        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        console.error("Gemini API Pipeline Error Details:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Secure backend infrastructure live on port 3000`));
