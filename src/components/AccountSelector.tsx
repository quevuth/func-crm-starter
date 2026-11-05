import React from "react";
import { IAccount } from "../types/func";
import { ChevronDown, MessageCircle, Facebook, PhoneCall } from "lucide-react";

interface AccountSelectorProps {
  accounts: IAccount[];
  selectedAccount?: IAccount;
  onSelect: (account: IAccount) => void;
}

export const AccountSelector: React.FC<AccountSelectorProps> = ({
  accounts,
  selectedAccount,
  onSelect,
}) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "ZALO_USER":
      case "ZALO_OA":
        return <div className="h-5 w-5 rounded bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">Z</div>;
      case "FACEBOOK_PAGE":
      case "FACEBOOK_USER":
        return <Facebook className="w-5 h-5 text-blue-600" />;
      case "WHATSAPP_USER":
        return <PhoneCall className="w-5 h-5 text-emerald-500" />;
      default:
        return <MessageCircle className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <div className="relative group p-3 border-b border-slate-100 bg-slate-50/50">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
        Kênh đang chọn
      </label>
      <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-xs cursor-pointer hover:border-indigo-300 transition-all">
        <div className="flex items-center gap-2.5 truncate">
          {selectedAccount && getPlatformIcon(selectedAccount.platform)}
          <div className="truncate">
            <p className="text-xs font-semibold text-slate-800 truncate">
              {selectedAccount?.name || "Chọn kênh..."}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {selectedAccount?.platform} • {selectedAccount?.pid}
            </p>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
      </div>

      {/* Dropdown Menu */}
      <div className="hidden group-hover:block absolute left-3 right-3 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 max-h-60 overflow-y-auto">
        {accounts.map((acc) => (
          <button
            key={acc.pid}
            onClick={() => onSelect(acc)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-slate-50 transition-colors ${
              selectedAccount?.pid === acc.pid ? "bg-indigo-50/60" : ""
            }`}
          >
            {getPlatformIcon(acc.platform)}
            <div className="truncate flex-1">
              <p className="text-xs font-medium text-slate-800 truncate">{acc.name}</p>
              <p className="text-[10px] text-slate-400">{acc.platform}</p>
            </div>
            {selectedAccount?.pid === acc.pid && (
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

