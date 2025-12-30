require("dotenv").config();
const express = require("express");
const cors = require("cors"); // 👈 ADD THIS
const connectDB = require("./config/db");
const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

// 👇 ADD THIS BLOCK (VERY IMPORTANT)
app.use(cors({
  origin: true, // ✅ allow any origin (local + Vercel)
  methods: ["GET", "POST", "OPTIONS"],
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
