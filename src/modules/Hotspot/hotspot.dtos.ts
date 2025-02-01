export interface createHotspotDTO {
  hotSpotID?: string;
  name: string;
  coordinates: Array<number>;
  description: string;
  address: string;
  tags?: Array<string>;
  numVotes?: number;
  backgroundImg: string;
  expiryDate?: Date;
}

export interface joinHotspotDTO {
  hotSpotID: string;
  userID: string;
}