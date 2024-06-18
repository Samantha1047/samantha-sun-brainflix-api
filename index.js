import express from "express";
import videoRoutes from "./routes/videos.js";
import cors from "cors";
import fs from "fs";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("This is a homePage for BrainFlix videos API, please make a request!");
});

app.use("/videos", videoRoutes);

app.listen(PORT, () => {
  console.log("App is running on port ", PORT);
});
