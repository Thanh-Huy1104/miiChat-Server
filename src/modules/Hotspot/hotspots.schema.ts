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
  createdAt: Date;
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
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const HotSpot = mongoose.model("Hotspot", hotSpotSchema);

export default HotSpot;
