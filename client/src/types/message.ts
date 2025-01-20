export interface IMessage {
  _id: string;
  text: string;
  image: string | ArrayBuffer;
  createdAt: string;
  senderId: string;
}

export interface IMessageBody {
  text: string;
  image: string | ArrayBuffer;
}
