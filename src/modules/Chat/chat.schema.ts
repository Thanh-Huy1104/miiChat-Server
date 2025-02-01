import mongoose from "mongoose";

import { IMessage } from "../Message/message.schema";

export interface IChat {
  chatID: string;
  hotSpotID: string;
  messages: Array<IMessage>;
}

const chatSchema = new mongoose.Schema(
  {
    chatID: { type: String, required: true },
    hotSpotID: { type: String, required: true },
    messages: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
