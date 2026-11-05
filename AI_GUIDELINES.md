# Func CRM - Vibe Coding Prompt Book (Sổ Tay Prompt Cho AI Agent) 🚀

Tài liệu này hướng dẫn cách kết hợp **Func Documentation MCP Server** và **`llms.txt`** để bạn có thể ra lệnh (vibe coding) cho AI xây dựng và tùy biến CRM theo đúng nhu cầu kinh doanh của mình.

---

## 🧭 Lựa Chọn 1 Trong 2 Cách Tích Hợp

### Cách A: Khi Dùng Cursor / Windsurf / Claude Code (Có kết nối MCP)
1. Bật MCP Server tại backend: `cd be && bun run dev:mcp` (chạy tại `http://localhost:3033/mcp/sse`).
2. Mở `func-crm-starter` trong Cursor -> Kiểm tra trạng thái chấm xanh trong **Settings -> Features -> MCP**.
3. Bạn chỉ cần chat với Cursor (`Cmd + L`), AI sẽ tự động gọi các tool MCP như `func_get_action_guide` với đúng `platform` để lấy tài liệu và sinh code chính xác!

### Cách B: Khi Dùng ChatGPT Plus / Claude Web / v0.dev / Bolt.new (Không dùng MCP)
1. Khi bắt đầu cuộc trò chuyện mới, bạn copy link hoặc đính kèm file tài liệu:
   > *"Đọc tài liệu tại `https://api.func.vn/llms.txt` (hoặc nội dung file `docs/llms.txt`) và hỗ trợ tôi xây dựng các tính năng CRM kết nối với Func."*
2. AI trên web sẽ đọc hiểu 100% cấu trúc API của Func để sinh code chuẩn cho bạn.

---

## 🎯 6 Mẫu Prompt Thực Chiến (Copy-Paste)

### Prompt 1: Thêm Gửi Tin Nhắn Đa Kênh (Zalo + Fanpage)
> *"Dùng tool MCP `func_get_action_guide` với platform `ZALO_USER` và `FACEBOOK_PAGE`, hãy nâng cấp hàm gửi tin nhắn trong ChatWindow để khi nhân viên chọn kênh Zalo thì gọi action `USER_SEND_MESSAGE`, còn khi chọn Fanpage thì gọi action `PAGE_SEND_MESSAGE`. Đảm bảo có xử lý lỗi và cập nhật giao diện tin nhắn ngay lập tức."*

---

### Prompt 2: Tìm Bạn Bè & Khách Hàng Zalo Qua Số Điện Thoại
> *"Dùng tool MCP `func_get_action_guide` với platform `ZALO_USER` và action `FIND_USER`. Hãy tạo một modal popup tìm kiếm khách hàng bằng số điện thoại. Tự động chuẩn hóa số điện thoại Việt Nam sang định dạng `+84`, gọi API tìm kiếm, và hiển thị avatar cùng nút 'Thêm vào danh bạ CRM'."*

---

### Prompt 3: Quản Lý Nhãn Phân Loại (Tags) & Ghi Chú
> *"Dùng tool MCP `func_get_client_api_guide` mục `contact_detail_and_update`. Hãy nâng cấp component ContactDetail để nhân viên có thể bấm chọn thêm/xóa các nhãn phân loại (VIP, Đang tư vấn, Đã mua, Cần gọi lại) và tự động lưu vào backend Func qua endpoint `PUT /accounts/:account_pid/contacts/:contact_pid`."*

---

### Prompt 4: Thêm Upload File & Ảnh Đính Kèm
> *"Hãy thêm tính năng chọn ảnh từ máy tính trong khung chat ChatWindow. Trước khi gửi tin nhắn, gọi API upload `POST /public/functions/attachments` (Content-Type: multipart/form-data) lên Func để lấy ID attachment, sau đó truyền mảng `attachment_ids: [id]` vào action gửi tin nhắn Zalo. Hiển thị ảnh thumbnail xem trước trong bong bóng chat."*

---

### Prompt 5: Kích Hoạt Kịch Bản Automation (Flow Runner)
> *"Dùng tool MCP `func_get_action_guide` với platform `FUNC` và action `FUNC_RUN_FLOW`. Hãy tạo nút 'Gửi kịch bản ưu đãi' trong trang chi tiết khách hàng. Khi bấm nút, gọi action `FUNC_RUN_FLOW` truyền vào `contact_pid` và biến `voucher_code: 'DISCOUNT50'` để bot tự động gửi kịch bản chăm sóc khách hàng."*

---

### Prompt 6: Lắng Nghe Tin Nhắn Realtime Qua Webhook
> *"Dùng tool MCP `func_get_webhook_guide`. Hãy giải thích cho tôi cách chạy server webhook `src/server/webhook-listener.ts` để khi khách hàng nhắn tin đến Zalo, server tự động nhận sự kiện `message.created` và cập nhật danh sách hội thoại ConversationList."*
