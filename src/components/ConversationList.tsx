import React from "react";
import { IContact } from "../types/func";
import { Search, Tag } from "lucide-react";

interface ConversationListProps {
  contacts: IContact[];
  selectedContact?: IContact;
  onSelectContact: (contact: IContact) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  contacts,
  selectedContact,
  onSelectContact,
  searchTerm,
  setSearchTerm,
}) => {
  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.phone && c.phone.includes(searchTerm)) ||
      (c.last_content && c.last_content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-80 md:w-96 border-r border-slate-200 bg-white flex flex-col shrink-0 h-full">
      {/* Search Header */}
      <div className="p-3 border-b border-slate-100">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên, SĐT (+84)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            Không tìm thấy hội thoại nào
          </div>
        ) : (
          filtered.map((contact) => {
            const isSelected = selectedContact?.pid === contact.pid;
            return (
              <div
                key={contact.pid}
                onClick={() => onSelectContact(contact)}
                className={`p-3.5 cursor-pointer transition-all flex items-start gap-3 hover:bg-slate-50/80 ${
                  isSelected ? "bg-indigo-50/50 border-r-2 border-indigo-600" : ""
                }`}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-100 to-slate-200 flex items-center justify-center font-bold text-indigo-700 text-sm shadow-xs overflow-hidden">
                    {contact.picture ? (
                      <img src={contact.picture} alt="" className="h-full w-full object-cover" />
                    ) : (
                      contact.name.charAt(0)
                    )}
                  </div>
                  {/* Channel Tag Badge */}
                  <span className="absolute -bottom-0.5 -right-0.5 h-4 px-1 rounded-sm bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center border border-white">
                    {contact.platform === "ZALO_USER" ? "Z" : "FB"}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-semibold text-slate-900 truncate">
                      {contact.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                      {contact.last_content_at || "Vừa xong"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 truncate mb-1.5">
                    {contact.last_content || "Bắt đầu cuộc trò chuyện..."}
                  </p>

                  {/* Tags & Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {contact.tags?.map((t) => (
                      <span
                        key={t.id}
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60"
                        style={{ color: t.color }}
                      >
                        {t.name}
                      </span>
                    ))}
                    {contact.unread_count && contact.unread_count > 0 ? (
                      <span className="ml-auto h-4 min-w-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {contact.unread_count}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

