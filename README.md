# 🍽️ Restaurant Agent

An AI-powered restaurant assistant built with **Node.js**, **Express**, **LangChain**, and **Google Gemini**. It uses a LangGraph ReAct agent to answer menu queries via a simple web chat UI.

---

## 🚀 Features

- 🤖 ReAct AI Agent powered by **Google Gemini 2.5 Flash**
- 🛠️ Custom LangChain tool (`getMenuTool`) to fetch menu by category
- 💬 Simple web chat interface (`public/index.html`)
- ⚡ Express.js REST API backend
- 🔐 API key loaded securely via `.env`

---

## 📁 Project Structure

```
restorentAgent/
├── public/
│   └── index.html      # Chat UI (served as static file)
├── server.js           # Express server + LangGraph agent
├── package.json
├── .env                # Your API key (not committed)
└── README.md
```

---

## 🛠️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a `.env` file

```env
GOOGLE_API_KEY=your_google_gemini_api_key_here
```

> Get your API key at [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

### 3. Run the server

```bash
node server.js
```

Or with auto-reload (nodemon):

```bash
npx nodemon server.js
```

### 4. Open in browser

```
http://localhost:4000
```

---

## 🧪 Example Queries

| Query | Response |
|---|---|
| What's for breakfast? | fafada gathiya, chips, dhosa, edli sambhar |
| What's for lunch? | gujarati thali with 56 items |
| What's for dinner? | pizza, burger, pasta |

---

## 🔗 API Endpoint

### `POST /chat`

**Request body:**
```json
{ "input": "What is the menu for dinner?" }
```

**Response:**
```json
{ "output": "Tonight's dinner menu is: pizza, burger, pasta." }
```

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `express` | Web server |
| `dotenv` | Environment variables |
| `@langchain/google-genai` | Gemini LLM integration |
| `@langchain/core` | LangChain tools & messages |
| `@langchain/langgraph` | ReAct agent runtime |
| `langchain` | Core LangChain library |
| `zod` | Tool schema validation |

---

## 📝 Notes

- The project uses **ES Modules** (`"type": "module"` in `package.json`). Use `import` syntax, not `require()`.
- If `nodemon` fails due to PowerShell restrictions, use `npx nodemon server.js` instead.
