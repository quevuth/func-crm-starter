# Func CRM Starter - AI Vibe Coding Template 🚀

> **Bộ Starter Kit hoàn chỉnh để khách hàng dùng Cursor, Windsurf, Claude Code, ChatGPT hoặc v0 "vibe coding" hệ thống Social CRM của riêng mình kết nối trực tiếp với backend của [Func.vn](https://func.vn).**

---

## 🌟 Tính Năng Sẵn Có

- 🤖 **Tích Hợp Sẵn Remote Documentation MCP Server:** Cung cấp tài liệu, schema tham số và code mẫu trực tiếp cho AI Agent trong lúc lập trình (không gửi tin nhắn qua MCP mà hướng dẫn AI Agent viết code gọi API Func chuẩn 100%).
- 📚 **Sẵn Sàng File `llms.txt`:** Dành cho người dùng không dùng MCP mà vibe code trên ChatGPT Web, Claude Web, v0.dev hoặc Bolt.new.
- 💬 **Đa Kênh (Omnichannel):** Hỗ trợ Zalo cá nhân (`ZALO_USER`), Zalo OA (`ZALO_OA`), Fanpage Facebook (`FACEBOOK_PAGE`), Facebook cá nhân (`FACEBOOK_USER`), và WhatsApp (`WHATSAPP_USER`).
- ⚡ **Giao Diện CRM Chuẩn SaaS:** Thiết kế 3 cột hiện đại (Kênh & Tìm kiếm -> Hội thoại -> Chat & Thông tin khách hàng).
- 🏷️ **Quản Lý Nhãn & Ghi Chú:** Gắn tag phân loại khách hàng, lưu ghi chú tư vấn nội bộ.
- 🔄 **Realtime Webhook Server:** Mẫu server độc lập (`src/server/webhook-listener.ts`) để nhận tin nhắn realtime từ Func.

---

## 🚀 Hướng Dẫn Bắt Đầu Nhanh

### Bước 1: Mở Project bằng AI Editor (Cursor / Windsurf)
Mở thư mục `func-crm-starter` trong **Cursor**:
```bash
cd func-crm-starter
code .
```

### Bước 2: Khởi chạy MCP Server (Tại Backend Func)
MCP Server của Func chạy như một app độc lập trên cổng `3033`:
```bash
cd be
bun run dev:mcp
```
*File cấu hình `.cursor/mcp.json` trong starter kit đã trỏ sẵn về `http://localhost:3033/mcp/sse`.*

### Bước 3: Cài đặt & Chạy Thử CRM
```bash
cd func-crm-starter

# Cài đặt dependencies
npm install

# Khởi chạy CRM Frontend
npm run dev
```
Truy cập: `http://localhost:5173` để trải nghiệm giao diện CRM ngay lập tức!

---

## 🪄 Cách Vibe Coding Với AI Agent

### Cách A: Khi Dùng Cursor / Windsurf / Claude Code (Có MCP)
Trong Cursor (`Cmd + L`), AI Agent đã tự động nhận diện 7 tools tài liệu của Func.
Khi bạn yêu cầu viết code, AI sẽ tự động gọi:
* `func_get_action_guide({ platform: "ZALO_USER", action_name: "USER_SEND_MESSAGE" })`
* `func_get_action_guide({ platform: "FACEBOOK_PAGE", action_name: "PAGE_SEND_MESSAGE" })`
* `func_get_client_api_guide(...)`
và sinh mã chuẩn 100% không bị ảo giác!

### Cách B: Khi Dùng ChatGPT / Claude Web / v0.dev / Bolt.new (Không dùng MCP)
Bạn chỉ cần mở link `https://api.func.vn/llms.txt` (hoặc mở file [docs/llms.txt](./docs/llms.txt) có sẵn trong repo), copy nội dung hoặc dán link vào chat và bảo AI viết code!

👉 Xem danh sách 6 prompt thực chiến chi tiết tại file [AI_GUIDELINES.md](./AI_GUIDELINES.md).

---

## 📡 Nhận Tin Nhắn Realtime Qua Webhook

Chạy Webhook Listener để lắng nghe tin nhắn mới từ khách hàng:
```bash
npm run webhook
```
Server sẽ chạy tại `http://localhost:4000/api/webhook/func`. Hãy dán URL này vào mục **Webhook URL** trên Dashboard của Func.

---

## 📚 Tài Liệu Kèm Theo Repo
- [docs/llms.txt](./docs/llms.txt): Bản tóm tắt cho LLM đọc nhanh.
- [docs/llms-full.txt](./docs/llms-full.txt): Toàn bộ thông số kỹ thuật và SDK code.
- [AI_GUIDELINES.md](./AI_GUIDELINES.md): Prompt Book với các câu lệnh mẫu copy-paste.
