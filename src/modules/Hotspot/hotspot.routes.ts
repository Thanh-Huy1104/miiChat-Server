import { Router, Request, Response } from "express";
import { createHotspotDTO } from "./hotspot.dtos";
import { IHotspot } from "./hotspots.schema";
import { createHotspot, upvoteHotspot, downvoteHotspot } from "./hotspot.service";

const router = Router();

router.get("/", () => console.log("Hello from hotspot routes"));

router.post("/upvote", async (req, res) => {
  try {
    await upvoteHotspot(req.body);
    res.status(200)
  } catch (error ) {
    //if there was an error, that means we had an error with one of the database functions
    res.status(500)
  }
})

router.post("/downvote", async (req, res) => {
  try {
    await downvoteHotspot(req.body)
    res.status(200)
  } catch (error) {
    res.status(500);
  }
})

router.post("/createHotspot", async (req: Request<createHotspotDTO>, res: Response): Promise<any> => {
  try {
    const { name, coordinates, description, address, tags } = req.body;
    const hotspot: IHotspot = await createHotspot(name, coordinates, description, address, tags);
    res.status(200).json(hotspot);
  } catch (error) {
    res.status(500).json({ message: `An error has occurred while creating hotspot: ${error}` });
  }});

export default router;
