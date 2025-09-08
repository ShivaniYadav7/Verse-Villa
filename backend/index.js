const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const PORT = 3001;

// Import docs routes
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const groupRoutes = require("./routes/groups");

app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/groups", groupRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || err });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
