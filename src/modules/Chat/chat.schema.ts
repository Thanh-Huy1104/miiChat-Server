const chatSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    hotSpotID: { type: String, required: true },
    messages: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
