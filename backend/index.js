const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB();

const app = express();

const cors = require("cors");

// Load allowed origins from environment variable and split to array
const allowedOriginsEnv = process.env.CORS_ALLOWED_ORIGINS || "";
const allowedOrigins = allowedOriginsEnv.split(",");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow non-browser requests like Postman
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
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
