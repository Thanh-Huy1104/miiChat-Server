import { Router, Request, Response } from "express";
import { loginUser } from "./auth.service";
import { IUser } from "../User/user.schema";

const router = Router();

router.get("/", () => console.log("Hello from auth routes"));

router.post("/", async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  const result: IUser | null = await loginUser(username, password);

  if (result && result.id) {
    return res.status(200).json({ user: result });
  }

  return res.status(400).json({ message: "Invalid Credentials" });
});


export default router;
