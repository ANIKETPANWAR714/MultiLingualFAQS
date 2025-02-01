import React, { useState } from "react";
import axios from "axios";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [lang, setLang] = useState("en");

  const fetchFAQs = async () => {
    try {
      const response = await axios.get(`/api/faqs?lang=${lang}`);
      setFaqs(response.data.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleCreateFAQ = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/faqs", { question, answer });
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("Error creating FAQ:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Admin Dashboard</h1>
      <form className="form" onSubmit={handleCreateFAQ}>
        <input
          className="input"
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {/* <CKEditor
          editor={ClassicEditor}
          data={answer}
          onChange={(event, editor) => {
            const data = editor.getData();
            setAnswer(data);
          }}
        /> */}
        <input className="input" type="text" placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <button className="button" type="submit">
          Add FAQ
        </button>
      </form>

      <div>
        <label>Select Language: </label>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="fr">French</option>
        </select>
        <button className="button" onClick={fetchFAQs}>
          Get FAQs
        </button>
      </div>

      <ul className="list">
        {faqs.map((faq) => (
          <li className="list-item" key={faq._id}>
            <strong>Question:</strong> {faq.question} <br />
            <strong>Answer:</strong> {faq.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
