const messageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    chatID: { type: String, required: true },
    content: { type: String, required: true },
    senderID: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
