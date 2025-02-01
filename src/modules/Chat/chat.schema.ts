const chatSchema = new mongoose.Schema(
  {
    hotSpotID: { type: String, required: true },
    messages: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
