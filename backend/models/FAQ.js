const mongoose = require("mongoose");
const redisClient = require("../config/redisClient");
const tr = require("googletrans").default;

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  question_hi: { type: String },
  question_bn: { type: String },
  question_fr: { type: String },
  createdAt: { type: Date, default: Date.now },
});


FAQSchema.methods.translateQuestion = async function (lang) {
  console.log(`Starting translation to language: ${lang}`); // Debug log

  // First check if translation exists in DB
  if (this[`question_${lang}`]) {
    
    return this[`question_${lang}`];
  }

  try {
    // Map language codes if needed
    const languageMap = {
      hi: "hi", // Hindi
      bn: "bn", // Bengali
      fr: "fr", // French
    };

    const translationLang = languageMap[lang] || lang;
   

    const result = await tr(this.question, {
      to: translationLang,
      from: "en", // Explicitly specify source language
    });

    if (!result || !result.text) {
      console.error("Translation result is empty");
      return this.question;
    }

    const translation = result.text;

    // Save the translation to the correct language field
    this[`question_${lang}`] = translation;
    await this.save();

    return translation;
  } catch (error) {
   
    return this.question; // Fallback to original question if translation fails
  }
};


module.exports = mongoose.model("FAQ", FAQSchema);
