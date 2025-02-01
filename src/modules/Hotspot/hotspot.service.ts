import { v4 as uuidv4 } from 'uuid';
import Hotspot, { IHotspot } from './hotspots.schema';
import { createChat } from '../Chat/chat.service';
import {createHotspotDTO} from "./hotspot.dtos";
import { hotspotThreshold } from '../../util/Constant';

export const createHotspot = async (name: string, coordinates: number[], description: string, address: string, tags: string[]): Promise<IHotspot> => {
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
  };

  // MAKE NUMVOTES 1, NOT 0

  return await Hotspot.create(hotspot);
}

export const upvoteHotspot = async (createHotspotDTO: createHotspotDTO) => {
  //Get the hotspot with input details
  const hotspot: IHotspot | null = await Hotspot.findOneAndUpdate(
      {hotSpotID: createHotspotDTO.hotSpotID},
      { $inc: { numVotes: 1 }},
      { new: true }
  );

  if (hotspot && hotspot.numVotes >= hotspotThreshold) {
    await Hotspot.findOneAndUpdate(
      { hotSpotID: hotspot.hotSpotID },
      { isActive: true });
  }
    
}

export const downvoteHotspot = async (createHotspotDTO: createHotspotDTO) => {
  //Get the hotspot with input details
  const hotspot: IHotspot | null = await Hotspot.findOneAndUpdate(
      {hotSpotID: createHotspotDTO.hotSpotID},
      { $dec: { numVotes: 1 }
      });
}

export const getActiveHotspots = async (): Promise<IHotspot[] | null> => {
  return await Hotspot.find({ isActive: true });
}

export const getInactiveHotspots = async (): Promise<IHotspot[] | null> => {
  return await Hotspot.find({ isActive: false });
}