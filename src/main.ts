import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './modules/User/user.routes';
import hotSpotRoutes from './modules/Hotspot/hotspot.routes';
import potentialHotspotRoutes from './modules/PotentialHotspot/potentialHotspot.routes';
import chatRoutes from './modules/Chat/chat.routes';
import messageRoutes from './modules/Message/message.routes';
import authRoutes from './modules/Auth/auth.routes';
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

connectDB();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/hotspots", hotSpotRoutes);
app.use("/api/potential-hotspots", potentialHotspotRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/login", authRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});