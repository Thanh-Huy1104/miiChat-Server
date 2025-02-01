import Message, { IMessage } from "../Message/message.schema";

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
