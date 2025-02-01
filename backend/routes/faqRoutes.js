const express = require("express");
const { createFAQ, getFAQs } = require("../controllers/faqControllers");

const router = express.Router();

// Routes to manage FAQs
router.post("/faqs", createFAQ);
router.get("/faqs", getFAQs);

module.exports = router;
