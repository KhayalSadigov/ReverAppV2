const express = require("express");
const app = express();
const usersRouter = require("./Routes/users.routes");
// Middleware
app.use(express.json());

// MySQL Bağlantısı


// API Endpoints
app.use(usersRouter);

// Sunucuyu Başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is done: http://localhost:${PORT}`);
});

