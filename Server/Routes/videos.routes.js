const express = require("express");
const multer = require("multer");
const path = require("path");
const videosController = require("../Controllers/videos.controller");
const endpoints = require("../Constants/endpoints");
const videoMiddlewares = require("../Middlewares/videos.middlewares");

const videoRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

videoRouter.post(
  endpoints.videos.post,
  upload.single("video"),
  videoMiddlewares.post,
  videosController.post
);
videoRouter.get(endpoints.videos.getOne, videosController.getOne);
videoRouter.get(endpoints.videos.getAll, videosController.getAll);
videoRouter.delete(endpoints.videos.delete, videosController.delete);
videoRouter.put(endpoints.videos.put, videosController.put);
module.exports = videoRouter;
