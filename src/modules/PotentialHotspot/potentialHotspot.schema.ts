const potentialHotspotSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    numVotes: { type: Number, required: true },
  },
  { timestamps: true }
);

const PotentialHotspot = mongoose.model("PotentialHotspot", potentialHotspotSchema);

module.exports = PotentialHotspot;
