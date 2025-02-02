import { v4 as uuidv4 } from "uuid";
import Hotspot, { IHotspot } from "./hotspots.schema";
import { createChat } from "../Chat/chat.service";
import { createHotspotDTO } from "./hotspot.dtos";
import { hotspotThreshold } from "../../util/Constant";
import User from "../User/user.schema";

export const createHotspot = async (
  name: string,
  coordinates: number[],
  description: string,
  address: string,
  tags: string[],
  backgroundImg: string,
  expiryDate: Date
): Promise<IHotspot> => {
  const hotSpotID = uuidv4();
  const chat = await createChat(hotSpotID);

  const hotspot = {
    hotSpotID,
    chatID: chat.chatID,
    name,
    coordinates,
    description,
    address,
    tags,
    backgroundImg,
    expiryDate,
  };

  // MAKE NUMVOTES 1, NOT 0

  return await Hotspot.create(hotspot);
};

export const upvoteHotspot = async (hotspotID: string, userID: string) => {
  //Get the hotspot with input details
  const hotspot: IHotspot | null = await Hotspot.findOneAndUpdate(
    { hotSpotID: hotspotID },
    { $inc: { numVotes: 1 } },
    { new: true }
  );

  if (hotspot && hotspot.numVotes >= hotspotThreshold) {
    await Hotspot.findOneAndUpdate(
      { hotSpotID: hotspot.hotSpotID },
      { isActive: true, expiryDate: new Date(Date.now() + 2 * 60 * 1000) }
    );
  }

  await User.findOneAndUpdate(
    { userID: userID },
    {
      $push: {
        Votes: {
          hotspotID: hotspotID,
          isUpvote: true,
        },
      },
    }
  );

  console.log("Done upvoting");
};

export const downvoteHotspot = async (hotspotID: string, userID: string) => {
  //Get the hotspot with input details
  const hotspot: IHotspot | null = await Hotspot.findOneAndUpdate(
    { hotSpotID: hotspotID },
    { $dec: { numVotes: 1 } }
  );

  await User.findOneAndUpdate(
    { userID: userID },
    {
      $push: {
        Votes: {
          hotspotID: hotspotID,
          isUpvote: false,
        },
      },
    }
  );

  console.log("Done downvoting");
};

export const getActiveHotspots = async (): Promise<IHotspot[] | null> => {
  return await Hotspot.find({ isActive: true });
};

export const getInactiveHotspots = async (): Promise<IHotspot[] | null> => {
  return await Hotspot.find({ isActive: false });
};

export const getHotspotByID = async (
  hotSpotID: string
): Promise<IHotspot | null> => {
  return await Hotspot.findOne({ hotSpotID });
};

export const deactivateHotspot = async (hotSpotID: string) => {
  await Hotspot.findOneAndUpdate(
    { hotSpotID },
    {
      isActive: false,
      numVotes: 0,
      expiryDate: new Date(Date.now() + 2 * 60 * 1000),
    }
  );
};
