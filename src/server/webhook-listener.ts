/**
 * FUNC REALTIME WEBHOOK LISTENER (Mẫu Server nhận Webhook từ Func.vn)
 * Chạy bằng Bun: `bun run src/server/webhook-listener.ts`
 * Hoặc Node: `npx tsx src/server/webhook-listener.ts`
 */

import { Elysia } from "elysia";

const app = new Elysia()
  // Endpoint nhận Webhook từ Func Dashboard
  .post("/api/webhook/func", ({ body, headers }) => {
    console.log("-----------------------------------------");
    console.log("⚡ Nhận Webhook mới từ Func:", new Date().toLocaleTimeString());
    console.log("Headers:", headers);
    console.log("Payload:", JSON.stringify(body, null, 2));

    const event = body as any;

    if (event.event === "message.created") {
      console.log(`💬 Khách hàng [${event.contact?.name}] nhắn tin: "${event.message?.text}"`);
      // TODO: Đẩy tin nhắn vào database riêng hoặc gửi realtime tới frontend CRM qua Socket
    } else if (event.event === "contact.updated") {
      console.log(`👤 Khách hàng [${event.contact?.name}] đã được cập nhật thông tin`);
    }

    // Luôn trả về 200 OK để xác nhận với Func đã nhận thành công
    return { success: true };
  })
  .get("/health", () => ({ status: "OK", timestamp: Date.now() }))
  .listen(4000);

console.log(`🚀 Webhook Listener đang chạy tại: http://localhost:4000/api/webhook/func`);
console.log(`👉 Hãy copy URL này điền vào phần Cài đặt Webhook trên Dashboard của Func!`);

