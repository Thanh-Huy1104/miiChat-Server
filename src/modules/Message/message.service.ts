import { v4 as uuidv4 } from 'uuid';
import Message, { IMessage } from './message.schema';

export const createMessage = async (chatID: string, content: string, senderID: string): Promise<IMessage> => {
  const messageID = uuidv4();
  const message = {
    messageID,
    chatID,
    content,
    senderID,
  };

  return await Message.create(message);
}