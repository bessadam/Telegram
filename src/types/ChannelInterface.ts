export interface ChannelInterface {
  id: number;
  name: string;
  shareLink: string; 
  info: string;
  muted: boolean; 
  subscribers: number; 
  avatar: string;
  lastActivity: number;
  posts: PostInterface[];
  data: {};
}

export interface PostInterface {
  media: string;
  text: string;
  time: number;
  views: number;
}

export interface SideMenuChannelInterface {
  id: number;
  name: string;
  avatar: string;
  posts: PostInterface[];
  muted: boolean;
}