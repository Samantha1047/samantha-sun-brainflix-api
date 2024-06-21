import express from "express";
import fs from "fs";
import crypto from "crypto";
import { timeStamp } from "console";

const router = express.Router();

function readData() {
  const videosData = fs.readFileSync("./data/videos.json");
  const parsedData = JSON.parse(videosData);
  return parsedData;
}

router.get("/", (req, res) => {
  const videos = readData();
  res.json(videos);
});

router.get("/:id", (req, res) => {
  const videos = readData();

  const singlevideo = videos.find((video) => video.id === req.params.id);
  if (singlevideo) {
    res.json(singlevideo);
  } else {
    res.status(404).json({
      message: "Please enter a valid ID",
      error: "404",
    });
  }
});

router.post("/", (req, res) => {
  const newVideo = {
    id: crypto.randomUUID(),
    title: req.body.title,
    channel: "User Upload",
    image: req.body.image,
    description: req.body.description,
    views: "980,544",
    likes: "22,479",
    duration: "4:01",
    video: "placeholder",
    timeStamp: timeStamp,
    comments: [],
  };

  const videos = readData();

  videos.push(newVideo);

  fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

  res.status(201).json(newVideo);
});

export default router;
