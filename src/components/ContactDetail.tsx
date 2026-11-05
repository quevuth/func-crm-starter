import React, { useState } from "react";
import { IContact } from "../types/func";
import { User, Phone, Mail, Tag, FileText, Zap, Plus, X } from "lucide-react";

interface ContactDetailProps {
  contact?: IContact;
  onUpdateTags?: (tagIds: string[]) => void;
}

export const ContactDetail: React.FC<ContactDetailProps> = ({ contact }) => {
  const [noteText, setNoteText] = useState(contact?.note || "");

  if (!contact) return null;

  return (
    <div className="w-72 xl:w-80 border-l border-slate-200 bg-white p-5 flex flex-col h-full overflow-y-auto shrink-0 hidden lg:flex">
      {/* Profile Header */}
      <div className="text-center pb-5 border-b border-slate-100">
        <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-indigo-100">
          {contact.name.charAt(0)}
        </div>
        <h3 className="text-sm font-bold text-slate-900">{contact.name}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{contact.platform}</p>
      </div>

      {/* Info List */}
      <div className="py-4 space-y-3 border-b border-slate-100 text-xs">
        <div className="flex items-center gap-2.5 text-slate-600">
          <Phone className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="font-medium text-slate-900">{contact.phone || "Chưa cập nhật"}</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-600">
          <User className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="truncate text-slate-500 font-mono text-[11px]">{contact.pid}</span>
        </div>
      </div>

      {/* Tags Section */}
      <div className="py-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-500" />
            Nhãn phân loại (Tags)
          </h4>
          <button className="text-[11px] text-indigo-600 font-semibold hover:underline flex items-center gap-0.5">
            <Plus className="w-3 h-3" /> Thêm
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {contact.tags && contact.tags.length > 0 ? (
            contact.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 flex items-center gap-1 border border-slate-200/60"
              >
                {tag.name}
                <X className="w-3 h-3 text-slate-400 hover:text-slate-600 cursor-pointer" />
              </span>
            ))
          ) : (
            <p className="text-[11px] text-slate-400 italic">Chưa gắn nhãn nào</p>
          )}
        </div>
      </div>

      {/* Internal Notes */}
      <div className="py-4 border-b border-slate-100 flex-1">
        <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-2">
          <FileText className="w-3.5 h-3.5 text-indigo-500" />
          Ghi chú nội bộ
        </h4>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Thêm thông tin nhu cầu, ngân sách..."
          rows={4}
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
        />
      </div>

      {/* Automation Actions */}
      <div className="pt-4">
        <button className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          Chạy Kịch Bản (Flow)
        </button>
      </div>
    </div>
  );
};

