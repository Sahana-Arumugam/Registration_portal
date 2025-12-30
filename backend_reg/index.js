require("dotenv").config();
const express = require("express");
const cors = require("cors"); // 👈 ADD THIS
const connectDB = require("./config/db");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

// 👇 ADD THIS BLOCK (VERY IMPORTANT)
app.use(cors({
  origin: "http://localhost:3001", // your Vite frontend
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api", registrationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
