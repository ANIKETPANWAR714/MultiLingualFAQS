const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("admin-bro-mongoose");
const mongoose = require("mongoose");
const FAQ = require("./models/FAQ"); // Adjust the path as needed

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  resources: [FAQ],
  rootPath: "/admin",
  branding: {
    companyName: "My Admin Panel",
    softwareBrothers: false,
  },
});

const router = AdminBroExpress.buildRouter(adminBro);
router.get('/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching FAQs', error });
  }
});

// Create a new FAQ
router.post('/faqs', async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ success: false, message: 'Question and Answer are required' });
    }
    const faq = new FAQ({ question, answer });
    await faq.save();
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ message: 'Error creating FAQ', error });
  }
});

module.exports = router;
