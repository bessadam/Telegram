import { CallsInterface } from "./Contacts";

export interface ChatInterface {
  id: number;
  name: string;
  surname?: string;
  lastActivity: number;
  avatar: string;
  chats: [];
  calls?: CallsInterface[];
  muted: boolean;
  phoneNumber?: string;
  subscribers?: number; 
  info?: string;
  link?: string;
}