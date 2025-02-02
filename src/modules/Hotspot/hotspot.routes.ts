import { Router, Request, Response } from "express";
import { createHotspotDTO, joinHotspotDTO } from "./hotspot.dtos";
import { IHotspot } from "./hotspots.schema";
import { createHotspot, upvoteHotspot, downvoteHotspot, getActiveHotspots, getInactiveHotspots, deactivateHotspot, getHotspotByID } from "./hotspot.service";

const router = Router();

router.get("/", () => console.log("Hello from hotspot routes"));

router.post("/upvote", async (req, res) => {
  try {
    await upvoteHotspot(req.body);
    res.status(200)
  } catch (error) {
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
    const { name, coordinates, description, address, tags, backgroundImg, expiryDate } = req.body;
    const hotspot: IHotspot = await createHotspot(name, coordinates, description, address, tags, backgroundImg, expiryDate);
    res.status(200).json(hotspot);
  } catch (error) {
    res.status(500).json({ message: `An error has occurred while creating hotspot: ${error}` });
  }});

router.get("/getActiveHotspots", async (req: Request<createHotspotDTO>, res: Response): Promise<any> => {
  try {
    const activeHotspots: IHotspot[] | null = await getActiveHotspots();

    if (activeHotspots) {
      res.status(200).json(activeHotspots);
    } else {
      res.status(400).json({ message: "No active hotspots found" });
    }
  } catch (error) {
    res.status(500).json({ message: `An error has occurred while fetching active hotspots: ${error}` });
  }});

router.get("/getInactiveHotspots", async (req: Request<createHotspotDTO>, res: Response): Promise<any> => {
  try {
    const inActiveHotspots: IHotspot[] | null = await getInactiveHotspots();

    if (inActiveHotspots) {
      res.status(200).json(inActiveHotspots);
    } else {
      res.status(400).json({ message: "No inactive hotspots found" });
    }
  } catch (error) {
    res.status(500).json({ message: `An error has occurred while fetching inactive hotspots: ${error}` });
  }});

  router.post("/getHostpotByID", async (req: Request, res: Response): Promise<any> => {
    try {
      const { hotspotID } = req.body;
      const hotspot: IHotspot | null = await getHotspotByID(hotspotID);
  
      if (hotspot) {
        res.status(200).json(hotspot);
      } else {
        res.status(400).json({ message: "No hotspot found" });
      }
    } catch (error) {
      res.status(500).json({ message: `An error has occurred while fetching hotspot: ${error}` });
    }}
  );

router.post("/deactiveHospot", async (req: Request, res: Response): Promise<any> => {
  try {
    const { hotspotID } = req.body;

    deactivateHotspot(hotspotID);
    res.status(200).json({ message: "Hotspot deactivated" });    
  } catch (error) {
    res.status(500).json({ message: `An error has occurred while deactivating a hotspot: ${error}` });
  }});

export default router;
