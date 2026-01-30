const express = require("express");
const cors = require("cors");

const awarenessRoute = require("./routes/awareness");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/awareness", awarenessRoute);

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Noise Awareness Backend is running"
  });
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
