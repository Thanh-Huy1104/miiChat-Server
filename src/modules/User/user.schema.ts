import mongoose from "mongoose";

export interface IUser {
  userID: string;
  username: string;
  password: string;
  profileImg: number;
  HotspotIDs: string[];
  Votes: Vote[];
  createdAt: Date;
  createdHotspot: boolean;
}

export type Vote = {
  hotspotID: string;
  isUpvote: boolean;
};

const userSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true, unique: true },
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