import { Router } from "express";

const router = Router();

router.get("/", () => console.log("Hello from hotspot routes"));

export default router;
