import { Router } from "express";

const router = Router();

router.get("/", () => console.log("Hello from user routes"));

export default router;
