export interface IMessage {
  content: string;
  username: string;
  timestamp: string;
  image?: string;
  delivering?: boolean;
  edited?: boolean;
}
