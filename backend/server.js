require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Local MongoDB Connected"))
  .catch((err) => console.log(err));

// 🔐 Auth routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/protected", require("./routes/protectedRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/mood", require("./routes/moodRoutes"));



app.get("/", (req, res) => {
  res.send("VYANA Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
