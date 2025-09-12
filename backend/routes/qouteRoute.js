// routes/quoteRoute.js
const express = require("express");
const router = express.Router();
const Quote = require("../models/quote");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// POST - Create new quote
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, model, parts } = req.body;

    // ✅ Validation
    if (!name || !email || !phone || !model || !model.id || !model.url) {
      return res.status(400).json({
        message: "All fields are required: name, email, phone, model.id, model.url",
      });
    }

    // ✅ Save to MongoDB
    const newQuote = new Quote({
      name,
      email,
      phone,
      model,
      parts: parts || [],
    });
    await newQuote.save();
    console.log("✅ Quote saved to MongoDB:", newQuote._id);

    // ✅ Ensure generated folder exists
    const generatedDir = path.join(__dirname, "../generated");
    if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir, { recursive: true });
      console.log("📂 Created 'generated' folder");
    }

    // ✅ FreeCAD script path & output STL
    const scriptPath = path.join(__dirname, "../freecad_scripts/generate_model.py");
    const outputPath = path.join(generatedDir, `${newQuote._id}.stl`);

    // ⚡ Full path to FreeCADCmd.exe (adjust your installation path)
    const freecadCmdPath = `"C:\\Program Files\\FreeCAD 0.21\\bin\\FreeCADCmd.exe"`;

    // ✅ Spawn FreeCAD
    const freecad = spawn(freecadCmdPath, [
      scriptPath,
      JSON.stringify({ model, parts }),
      outputPath,
    ]);

    // Log stdout
    freecad.stdout.on("data", (data) => {
      console.log("🟢 FreeCAD:", data.toString());
    });

    // Log stderr
    freecad.stderr.on("data", (data) => {
      console.error("🔴 FreeCAD Error:", data.toString());
    });

    // On process close
    freecad.on("close", (code) => {
      console.log(`⚙️ FreeCAD exited with code ${code}`);
    });

    // ✅ Respond to frontend
    res.status(201).json({
      message: "Quote saved & FreeCAD model generation started",
      quoteId: newQuote._id,
      stlPath: `/generated/${newQuote._id}.stl`,
    });
  } catch (err) {
    console.error("❌ Error in quoteRoute:", err);
    res.status(500).json({
      message: "Server error while saving quote",
      error: err.message,
    });
  }
});

module.exports = router;
