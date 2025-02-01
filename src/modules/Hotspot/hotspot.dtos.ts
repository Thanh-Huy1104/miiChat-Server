export interface createHotspotDTO {
  hotSpotID: string;
  name: string;
  coordinates: Array<number>;
  description: string;
  address: string;
  tags: Array<string>;
  numVotes: number;
}