import { Router, Request, Response } from "express";
import { GetMessagesDTO } from "./chat.dtos";
import { IMessage } from "../Message/message.schema";
import { getMessages } from "./chat.service";

const router = Router();

router.get("/", () => console.log("Hello from hotspot routes"));

router.post("/messages", async (req: Request<GetMessagesDTO>, res: Response): Promise<any> => {
  const { chatID, lastMessageID } = req.body;

  if (!chatID) {
    return res.status(400).json({ message: "chatID is required" });
  }

  try {
    let messages: IMessage[] | null = null;
    
    messages = await getMessages(chatID, lastMessageID);    

    if (messages) {
      return res.status(200).json({ messages });
    } else {
      return res.status(400).json({ message: "No messages found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while fetching messages" });
  }
});

export default router;
