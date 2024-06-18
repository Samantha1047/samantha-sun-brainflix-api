import express from "express";
import fs from "fs";
import crypto from "crypto";

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
    // If no note found with the given ID, return 404 error
    res.status(404).json({
      message: "Please enter a valid ID",
      error: "404",
    });
  }
});

export default router;
