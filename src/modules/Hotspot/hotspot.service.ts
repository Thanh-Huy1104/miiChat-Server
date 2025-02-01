import { v4 as uuidv4 } from 'uuid';
import Hotspot, { IHotspot } from './hotspots.schema';
import { createChat } from '../Chat/chat.service';

export const createHotspot = async (name: string, coordinates: number[], description: string, address: string, tags: string[]): Promise<IHotspot> => {
  const hotSpotID = uuidv4();
  const chat = createChat(hotSpotID);

  const hotspot = {
    hotSpotID,
    chatID: chat.chatID,
    name,
    coordinates,
    description,
    address,
    tags,
  };

  return await Hotspot.create(hotspot);
}