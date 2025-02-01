const FAQ = require("../models/FAQ");

exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res
        .status(400)
        .json({ success: false, message: "Question and Answer are required" });
    }

    const faq = new FAQ({ question, answer });
    await faq.save();

    res
      .status(201)
      .json({ success: true, message: "FAQ created successfully", data: faq });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

 // Adjust the path as needed

exports.getFAQs = async (req, res) => {
  try {
    const { lang = "en" } = req.query;
    console.log(`Fetching FAQs with language: ${lang}`);

    const faqs = await FAQ.find();

    // If language is English, return original questions
    if (lang === "en") {
      return res.status(200).json({
        success: true,
        data: faqs,
        language: lang,
      });
    }

    // Validate language code
    const supportedLanguages = ["en", "hi", "bn", "fr" ];
    if (!supportedLanguages.includes(lang)) {
      return res.status(400).json({
        success: false,
        message: `Unsupported language code: ${lang}. Supported languages are: ${supportedLanguages.join(
          ", "
        )}`,
      });
    }

    const translatedFAQs = await Promise.all(
      faqs.map(async (faq) => {
        try {
          console.log(`Translating FAQ ID ${faq._id} to ${lang}`);

          // Get translation
          const translatedQuestion = await faq.translateQuestion(lang);

        

          return {
            ...faq.toObject(),
            question: translatedQuestion,
            originalQuestion: faq.question, // Keep original question for reference
          };
        } catch (translationError) {
          console.error(
            `Translation error for FAQ ${faq._id}:`,
            translationError
          );
          return faq;
        }
      })
    );

    res.status(200).json({
      success: true,
      data: translatedFAQs,
      language: lang,
      count: translatedFAQs.length,
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching FAQs",
      error: error.message,
    });
  }
};
