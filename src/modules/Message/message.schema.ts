import mongoose from "mongoose";

export interface IMessage {
  messageID: string;
  chatID: string;
  content: string;
  senderID: string;
  createdAt?: Date;
}

const messageSchema = new mongoose.Schema(
  {
    messageID: { type: String, required: true },
    chatID: { type: String, required: true },
    content: { type: String, required: true },
    senderID: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;