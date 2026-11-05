export type FuncPlatform =
  | "ZALO_USER"
  | "ZALO_OA"
  | "FACEBOOK_PAGE"
  | "FACEBOOK_USER"
  | "WHATSAPP_USER";

export interface ITag {
  id: string;
  name: string;
  color?: string;
}

export interface IAccount {
  pid: string;
  name: string;
  platform: FuncPlatform;
  picture?: string;
  phone?: string;
  active: boolean;
  api_token?: string;
  tags?: ITag[];
}

export interface IContact {
  pid: string;
  origin_id?: string;
  account_pid: string;
  platform: FuncPlatform;
  name: string;
  phone?: string;
  picture?: string;
  email?: string;
  note?: string;
  tags?: ITag[];
  attrs?: Record<string, any>;
  last_content?: string;
  last_content_at?: string;
  unread_count?: number;
}

export interface IMessage {
  id: string;
  contact_pid: string;
  account_pid?: string;
  text?: string;
  sender_type: "USER" | "CONTACT";
  sent_at: number;
  attachments?: Array<{
    id: string;
    url?: string;
    mime_type?: string;
    name?: string;
    size?: number;
  }>;
  status?: "SENT" | "DELIVERED" | "READ" | "FAILED";
}

export interface IWebhookEvent {
  event: "message.created" | "contact.updated" | "flow.completed";
  timestamp: number;
  account_pid: string;
  contact: IContact;
  message?: IMessage;
  payload?: Record<string, any>;
}

