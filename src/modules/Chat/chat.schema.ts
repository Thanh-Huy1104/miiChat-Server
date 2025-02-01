import { IMessage } from "../Message/message.schema";

export interface IChat {
  hotSpotID: string;
  messages: Array<IMessage>;
}

const chatSchema = new mongoose.Schema(
  {
    hotSpotID: { type: String, required: true },
    messages: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
