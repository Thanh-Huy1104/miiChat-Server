import mongoose from "mongoose";

export interface IHotspot {
  hotSpotID: string;
  chatID: string;
  name: string;
  coordinates: Array<number>;
  description: string;
  address: string;
  tags: Array<string>;
  numVotes: number;
  backgroundImg: string;
  isActive: boolean;
  userIDs: Array<string>;
  createdAt: Date;
  expiryDate: Date;
}

const hotSpotSchema = new mongoose.Schema(
  {
    hotSpotID: { type: String, required: true },
    chatID: { type: String, required: true },
    name: { type: String, required: true },
    coordinates: { type: Array, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    tags: { type: Array, default: [] },
    numVotes: { type: Number, default: 0 },
    backgroundImg: { type: String, default: "" },
    isActive: { type: Boolean, default: false },
    userIDs: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
    expiryDate: { type: Date, default: () => new Date(Date.now() + 20 * 60 * 1000) },
  },
  { timestamps: true }
);

const HotSpot = mongoose.model("Hotspot", hotSpotSchema);

export default HotSpot;
