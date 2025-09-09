const express = require("express");
const router = express.Router();
const Quote = require("../models/quote");

// POST - Create new quote request
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, model,parts } = req.body;

    // Validation
    if (!name || !email || !phone || !model || !model.id || !model.url) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new quote document
    const newQuote = new Quote({
      name,
      email,
      phone,
      model,
      parts
    });

    await newQuote.save();

    res.status(201).json({ message: "Quote request saved successfully." });
  } catch (err) {
    console.error("❌ Error saving quote:", err);
    res.status(500).json({ message: "Server error while saving quote." });
  }
});

module.exports = router;
