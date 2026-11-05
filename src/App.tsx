import React, { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { AccountSelector } from "./components/AccountSelector";
import { ConversationList } from "./components/ConversationList";
import { ChatWindow } from "./components/ChatWindow";
import { ContactDetail } from "./components/ContactDetail";
import { funcClient } from "./lib/func-client";
import { IAccount, IContact, IMessage } from "./types/func";

export function App() {
  const [activeTab, setActiveTab] = useState("inbox");
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount | undefined>();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<IContact | undefined>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 1. Tải danh sách Accounts
  useEffect(() => {
    funcClient.getAccounts().then((accs) => {
      setAccounts(accs);
      if (accs.length > 0) {
        setSelectedAccount(accs[0]);
      }
      setIsLoading(false);
    });
  }, []);

  // 2. Tải danh sách Contacts khi đổi Account
  useEffect(() => {
    if (!selectedAccount) return;
    funcClient.getContacts(selectedAccount.pid).then((cts) => {
      setContacts(cts);
      if (cts.length > 0) {
        setSelectedContact(cts[0]);
      } else {
        setSelectedContact(undefined);
      }
    });
  }, [selectedAccount]);

  // 3. Tải tin nhắn khi đổi Contact
  useEffect(() => {
    if (!selectedAccount || !selectedContact) {
      setMessages([]);
      return;
    }
    funcClient.getMessages(selectedAccount.pid, selectedContact.pid).then((msgs) => {
      setMessages(msgs);
    });
  }, [selectedAccount, selectedContact]);

  // 4. Xử lý gửi tin nhắn mới
  const handleSendMessage = async (text: string) => {
    if (!selectedAccount || !selectedContact) return;

    // Optimistic UI update
    const optimisticMsg: IMessage = {
      id: "temp_" + Date.now(),
      contact_pid: selectedContact.pid,
      text,
      sender_type: "USER",
      sent_at: Date.now(),
      status: "SENT",
    };

    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      await funcClient.sendMessage(
        selectedContact.pid,
        text,
        selectedAccount.platform
      );
    } catch (err) {
      console.error("Gửi tin nhắn thất bại:", err);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      {/* 1. Main Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Conversations Column */}
      <div className="flex flex-col h-full shrink-0">
        <AccountSelector
          accounts={accounts}
          selectedAccount={selectedAccount}
          onSelect={setSelectedAccount}
        />
        <ConversationList
          contacts={contacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* 3. Central Chat Window */}
      <ChatWindow
        contact={selectedContact}
        messages={messages}
        onSendMessage={handleSendMessage}
      />

      {/* 4. Customer Info Sidepanel */}
      <ContactDetail contact={selectedContact} />
    </div>
  );
}

export default App;

