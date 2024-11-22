const express = require("express");
const app = express();
const usersRouter = require("./Routes/users.routes");
const videoRouter = require("./Routes/videos.routes");
const path = require("path");
const subjectRouter = require("./Routes/subjects.routes");
// Middleware
app.use(express.json());

// MySQL Bağlantısı

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// API Endpoints
app.use(usersRouter);
app.use(videoRouter);
app.use(subjectRouter);

// Sunucuyu Başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is done: http://localhost:${PORT}`);
});
