import React from "react";
import {
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  Layers,
  Sparkles,
  Bot,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "inbox", label: "Hội thoại", icon: MessageSquare, badge: "3" },
    { id: "contacts", label: "Khách hàng", icon: Users },
    { id: "flows", label: "Automation Bot", icon: Bot },
    { id: "analytics", label: "Báo cáo", icon: BarChart3 },
    { id: "settings", label: "Cài đặt MCP", icon: Settings },
  ];

  return (
    <aside className="w-16 md:w-60 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
      <div>
        {/* Brand Logo */}
        <div className="h-16 flex items-center px-4 md:px-5 border-b border-slate-100 gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shadow-indigo-200">
            F
          </div>
          <div className="hidden md:block">
            <h1 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5">
              Func CRM
              <span className="text-[10px] bg-indigo-50 text-indigo-600 font-semibold px-1.5 py-0.5 rounded-md border border-indigo-100">
                AI Ready
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Omnichannel Hub</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-2 md:p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold shadow-xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                  <span className="hidden md:inline">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="hidden md:flex h-5 min-w-5 px-1.5 items-center justify-center rounded-full bg-indigo-600 text-white text-[11px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* MCP AI Agent Status Pill */}
      <div className="p-3 border-t border-slate-100">
        <div className="hidden md:flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <div className="flex-1 truncate font-mono text-[11px]">
            MCP: <span className="text-emerald-600 font-semibold">Active</span>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
        </div>
      </div>
    </aside>
  );
};

