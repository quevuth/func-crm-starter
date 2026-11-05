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

## Architecture & Integration
- For Public API calls: use `funcClient.callAction(action, data)`
- For real-time messaging: see `src/server/webhook-listener.ts`
- For types: see `src/types/func.ts`
- When calling MCP tools `func_get_action_schema` or `func_get_action_guide`, always provide both `platform` ('ZALO_USER', 'ZALO_OA', 'FACEBOOK_PAGE', 'FACEBOOK_USER', 'WHATSAPP_USER', 'FUNC') and `action_name`.
