require("dotenv").config();
const express = require("express");
const cors = require("cors");
const classifyRoute = require("./routes/classify");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// health check — useful to confirm the server is alive before connecting frontend
app.get("/", (req, res) => {
  res.json({ status: "TrueReach backend running" });
});

app.use("/api/classify", classifyRoute);

app.listen(PORT, () => {
  console.log(`🚀 TrueReach backend running on http://localhost:${PORT}`);
});