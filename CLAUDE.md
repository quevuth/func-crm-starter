# Func CRM Starter - Claude Code & Agent Guide

This project is a modern Omnichannel Social CRM connecting to **Func.vn** (Zalo User & OA, Facebook Page & User, WhatsApp).

## Tech Stack
- Frontend: Vite + React 18 / TypeScript + Tailwind CSS
- Icons: Lucide React
- API Client: Native typed client in `src/lib/func-client.ts`
- Remote MCP Server: `http://localhost:3033/mcp/sse` or `https://api.func.vn/mcp/sse` (Pure documentation, schema, and implementation guide provider)
- Offline LLM Docs: `docs/llms.txt` and `docs/llms-full.txt`

## Commands
- `npm install`: Install dependencies
- `npm run dev`: Start local CRM frontend (Vite) at `http://localhost:5173`
- `npm run webhook`: Run local webhook receiver server (`src/server/webhook-listener.ts`)

## Architecture & Integration Rules (CRITICAL FOR AI AGENTS)
1. **Public RPC API vs Client REST API:**
   - When calling Public RPC actions (via `POST /public/functions/api`), use platform-native IDs:
     - `ZALO_USER`: `user_id` (Zalo origin ID) or `phone_number`. **DO NOT USE `contact_pid`**.
     - `FACEBOOK_PAGE`: `recipient: { id: "psid" }`.
     - `WHATSAPP_USER`: `chat_id: "8491...@s.whatsapp.net"`.
     - `ZALO_OA`: `user_id`.
   - `contact_pid` is ONLY used for `FUNC` aggregation actions (`FUNC_RUN_FLOW`, `FUNC_GET_MESSAGES`) or Client REST API (`/accounts/:account_pid/...`).
2. **Zalo Text Formatting & UTF-16 Code Units:**
   - Use `formatZaloMarkdown(text)` from `src/lib/func-client.ts` to convert Markdown (`**bold**`, `*italic*`, `~~strike~~`, `__underline__`) into `{ message, styles }` with 100% accurate UTF-16 offsets (automatically handles emoji surrogate pairs).
3. **MCP Tool Invocations:**
   - Always pass both `platform` ('ZALO_USER', 'ZALO_OA', 'FACEBOOK_PAGE', 'FACEBOOK_USER', 'WHATSAPP_USER', 'FUNC') and `action_name` when calling `func_get_action_schema` or `func_get_action_guide`.
