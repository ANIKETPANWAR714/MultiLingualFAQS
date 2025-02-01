const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const faqRoutes = require("./routes/faqRoutes");
const adminRouter = require("./admin"); // Import AdminBro setup

dotenv.config();
const app = express();

const connectDB = require("./config/db");
connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// API routes
app.use("/api", faqRoutes);

// AdminBro route
app.use("/admin/api", adminRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
