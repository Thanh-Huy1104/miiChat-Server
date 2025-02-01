import mongoose, { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId
  username: string;
  password: string;
  profileImg: number;
  HotspotIDs: string[];
  Votes: string[];
  createdAt: Date;
  createdHotspot: boolean;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: Number, default: -1 },
    HotspotIDs: { type: Array, default: [] },
    Votes: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
    createdHotspot: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;