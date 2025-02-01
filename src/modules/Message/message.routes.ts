import { Router, Request, Response } from "express";
import { createMessageDTO } from "./message.dtos";
import { IMessage } from "./message.schema";
import { createMessage } from "./message.service";

const router = Router();

router.get("/", () => console.log("Hello from hotspot routes"));

router.post("/sendMessage", async (req: Request<createMessageDTO>, res: Response): Promise<any> => {
  try {
    const { chatID, senderID, content } = req.body;
    const message: IMessage = await createMessage(chatID, senderID, content);
    res.status(200).json(message);
  } catch (error) {
      res.status(500).json({ message: `An error has occurred while creating user: ${error}` });
  }  
});

export default router;
