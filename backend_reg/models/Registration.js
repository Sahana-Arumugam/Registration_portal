const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  registration_type: {
    type: String,
    enum: ["student", "professional"],
    required: true
  },
  company: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Registration", registrationSchema);
