const hotSpotSchema = new mongoose.Schema(
  {
    chatID: { type: String, required: true },
    name: { type: String, required: true },
    coordinates: { type: Array, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    tags: { type: Array, default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const HotSpot = mongoose.model("Hotspot", hotSpotSchema);

module.exports = HotSpot;
