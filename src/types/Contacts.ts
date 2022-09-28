export interface ContactsInterface {
  id: number;
  name: string;
  surname: string;
  email : string;
  avatar: string;
  lastActivity: number;
  phoneNumber: string;
  link: string;
  muted?: boolean;
  channels: ContactChannelInterface[];
  contacts: ContactContactsInterface[];
  calls: CallsInterface[];
}

export interface ContactChannelInterface {
  id: number;
  muted: boolean;
}

export interface ContactContactsInterface {
  id: number;
  muted: boolean;
  chats: ContactChatInterface[];
}

export interface ContactChatInterface {
  fromConsumer: boolean;
  time: number;
  text: string;
}

export interface CallsInterface {
  userName: string;
  userSurname: string;
  userConsumerID: number;
  count: number;
  time: number;
  status: string;
  duration: number;
  avatar?: string;
}