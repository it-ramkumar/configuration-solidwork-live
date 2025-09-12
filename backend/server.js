require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const helmetMiddleware = require("./middleware/helmetMiddleware");
const corsMiddleware = require("./middleware/corsMiddleware");
const { globalLimiter } = require("./middleware/rateLimiting");
const { morganMiddleware, logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const quoteRoutes = require("./routes/qouteRoute");
const postModelDataRoute = require("./routes/postModelDataRoute");
const insertManyDataRoute = require("./routes/insertManyData");
const modelsRoute = require("./routes/modelsRoute");

const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

const quotesRoute = require("./routes/qouteRoute");

// ✅ Allow requests from frontend
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use("/api/quotes", quotesRoute);

// 1️⃣ Connect to MongoDB
connectDB()
  .then(() => logger.info(" Connected to MongoDB"))
  .catch((err) => logger.error(` MongoDB connection error: ${err.message}`));

// 2️⃣ Security Middleware
app.use(helmetMiddleware);

// 3️⃣ HTTP Request Logging (Morgan + Winston)
app.use(morganMiddleware);

// 4️⃣ Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5️⃣ Enable CORS
app.use(corsMiddleware);

// 6️⃣ Rate Limiting
app.use(globalLimiter);

// 7️⃣ Routes
app.use("/api", authRoutes);
app.use("/api/quote", quoteRoutes);
app.use("/api/modelsData", postModelDataRoute);
app.use("/api/insertManyData", insertManyDataRoute);
app.use("/api/models", modelsRoute);
app.use("/api", postModelDataRoute);

// 8️⃣ Serve generated FreeCAD/STL files
app.use("/generate", express.static(path.join(__dirname, "generate")));

// 9️⃣ Protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  console.log("Decoded user:", req.user);
  res.json({
    success: true,
    message: "Protected route accessed!",
    user: req.user
  });
});

// 10️⃣ Test route (optional)
// app.get("/api/test", (req, res) => {
//   res.json({ success: true, message: "Middleware test route" });
// });

// 11️⃣ Global Error Handler
app.use(errorHandler);

// 12️⃣ Start the Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`
  );
});
