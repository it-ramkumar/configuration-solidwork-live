const { InteriorModel, ExteriorModel, SystemModel } = require("../models/modelsByCategory");
const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { category, data } = req.body;

    // Agar direct array bheji hai without "data"
    if (Array.isArray(req.body) && req.body.length > 0) {
      data = req.body;
      category = req.body[0]?.category; // Pehle object se category le lo
    }

    // Agar data me category nahi di aur upar se bhi nahi aayi
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required (interior, exterior, system)"
      });
    }

    // Agar data valid array nahi hai
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Data must be a non-empty array"
      });
    }

    // Model select kare category ke basis pe
    let Model;
    if (category === "interior") Model = InteriorModel;
    else if (category === "exterior") Model = ExteriorModel;
    else if (category === "system") Model = SystemModel;
    else {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    // Insert data (category inject karke)
    const insertedData = await Model.insertMany(
      data.map(item => ({ ...item, category }))
    );

    res.json({
      success: true,
      message: `${category} data imported successfully!`,
      count: insertedData.length,
      data: insertedData
    });

  } catch (error) {
    console.error("Bulk insert error:", error);
    res.status(500).json({ success: false, error: "Failed to import data" });
  }
});

module.exports = router;
