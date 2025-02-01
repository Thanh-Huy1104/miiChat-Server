import Message, { IMessage } from "../Message/message.schema";
import Chat, { IChat } from "./chat.schema";
import { v4 as uuidv4 } from 'uuid';

export const getMessages = async (chatID: string, lastMessageID?: string): Promise<IMessage[] | null> => {
  try {
    let messages: IMessage[] | null = null;

    if (lastMessageID) {
      const lastMessage = await Message.findOne({ id: lastMessageID });

      if (!lastMessage) {
        return null;
      }

      const lastMessageTime = lastMessage.createdAt;

      messages = await Message.find({
        chatID: chatID,
        createdAt: { $gt: lastMessageTime }
      }).sort({ createdAt: 1 });

    } else {
      messages = await Message.find({ chatID: chatID }).sort({ createdAt: 1 });
    }

    return messages;

  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createChat = async (hotSpotID: string): Promise<IChat> => {
  const chatID = uuidv4();

  const chat = {
    chatID,
    hotSpotID,
  }
  
  return await Chat.create(chat);
}
