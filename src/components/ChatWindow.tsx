import React, { useState } from "react";
import { IContact, IMessage } from "../types/func";
import { Send, Paperclip, Smile, CheckCheck, Clock, Phone } from "lucide-react";

interface ChatWindowProps {
  contact?: IContact;
  messages: IMessage[];
  onSendMessage: (text: string) => Promise<void>;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  contact,
  messages,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!contact) {
    return (
      <div className="flex-1 bg-slate-50 flex items-center justify-center p-8 text-center text-slate-400">
        <div>
          <div className="h-12 w-12 rounded-2xl bg-slate-200/60 mx-auto mb-3 flex items-center justify-center text-slate-400">
            💬
          </div>
          <p className="text-sm font-medium text-slate-600">Chưa chọn cuộc trò chuyện</p>
          <p className="text-xs text-slate-400 mt-1">Chọn một khách hàng ở danh sách bên trái để bắt đầu chat</p>
        </div>
      </div>
    );
  }

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isSending) return;

    const text = inputText.trim();
    setInputText("");
    setIsSending(true);
    try {
      await onSendMessage(text);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex-1 bg-white flex flex-col h-full min-w-0">
      {/* Header */}
      <div className="h-16 px-4 md:px-6 border-b border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 truncate">
          <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm shrink-0">
            {contact.name.charAt(0)}
          </div>
          <div className="truncate">
            <h3 className="text-sm font-bold text-slate-900 truncate flex items-center gap-2">
              {contact.name}
              <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                {contact.platform}
              </span>
            </h3>
            <p className="text-xs text-slate-400 truncate flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              {contact.phone || "Chưa có SĐT"} • {contact.pid}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          Đang kết nối
        </div>
      </div>

      {/* Messages Timeline */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-3.5 bg-slate-50/40">
        {messages.map((msg) => {
          const isOutbound = msg.sender_type === "USER";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isOutbound ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-xs ${
                  isOutbound
                    ? "bg-indigo-600 text-white rounded-br-xs"
                    : "bg-white text-slate-800 border border-slate-200/70 rounded-bl-xs"
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 px-1">
                <span>{new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {isOutbound && (
                  msg.status === "READ" ? (
                    <CheckCheck className="w-3 h-3 text-indigo-500" />
                  ) : (
                    <Clock className="w-2.5 h-2.5 text-slate-400" />
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 md:p-4 border-t border-slate-100 bg-white flex items-center gap-2 shrink-0">
        <button
          type="button"
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          title="Đính kèm file/ảnh"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Nhập tin nhắn trả lời khách hàng..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isSending}
          className="h-9 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
        >
          <span>Gửi</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

