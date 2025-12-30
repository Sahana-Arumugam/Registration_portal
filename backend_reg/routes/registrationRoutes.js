const express = require("express");
const Registration = require("../models/Registration");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const { name, email, registration_type, company, phone } = req.body;

    await Registration.create({
      name,
      email,
      registration_type,
      company,
      phone
    });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

module.exports = router;
