const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ quiet: true });

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { DynamicStructuredTool } = require("@langchain/core/tools");
const { createReactAgent } = require("@langchain/langgraph/prebuilt");
const { HumanMessage } = require("@langchain/core/messages");
const { z } = require("zod");

const port = 4000;
const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    maxOutputTokens: 2048,
    temperature: 0.7,
    apiKey: process.env.GOOGLE_API_KEY,
});

const getMenuTool = new DynamicStructuredTool({
    name: "getMenuTool",
    description: "Returns today's menu for the given category (breakfast, lunch, or dinner).",
    schema: z.object({
        category: z.string().describe("Type of food: breakfast, lunch, or dinner"),
    }),
    func: async ({ category }) => {
        const menus = {
            breakfast: "fafada gathiya, chips, dhosa, edli sambhar",
            lunch: "gujarati thali with 56 items",
            dinner: "pizza, burger, pasta",
        };
        return menus[category.toLowerCase()] || "No menu found for this category";
    },
});

const agent = createReactAgent({
    llm: model,
    tools: [getMenuTool],
    prompt: "You are a helpful restaurant assistant that uses tools when needed.",
});

app.post("/chat", async (req, res) => {
    try {
        const { input } = req.body;
        const response = await agent.invoke({
            messages: [new HumanMessage(input)],  // LangGraph uses messages array
        });

        // get the last message which is the final answer
        const lastMessage = response.messages[response.messages.length - 1];
        return res.json({ output: lastMessage.content });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ output: "Failed to get response from agent" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
    console.log("Server is listening on", port);
});
