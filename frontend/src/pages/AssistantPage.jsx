import { useState } from "react";
import api from "../services/api";

function AssistantPage() {
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("English");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAssistant = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    try {
      setLoading(true);
      setAnswer("");

      const response = await api.post("/ask", {
        question: question,
        language: language,
      });

      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      alert("AI Assistant failed. Check backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="hero">
        <h1>AI Business Assistant</h1>
        <p>
          Ask questions about services, pricing, audit, policies, and delivery
          process.
        </p>
      </div>

      <div className="card">
        <h2>💬 Ask Fingertips AI</h2>

        <div className="form-grid">
          <div>
            <label>Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="German">German</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>
        </div>

        <div className="quick-questions">
          <h4>💡 Try asking</h4>

          {[
            "What services do you offer?",
            "Explain Business Audit.",
            "What is AI Customer Support Agent?",
            "How are services delivered?",
            "How much does an AI Agent cost?",
            "What industries do you serve?",
          ].map((q, index) => (
            <button
              key={index}
              className="question-btn"
              type="button"
              onClick={() => setQuestion(q)}
            >
              {q}
            </button>
          ))}
        </div>

        <textarea
          className="chat-input"
          placeholder="Ask: What services do you offer?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button onClick={askAssistant} disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {answer && (
          <div className="ai-answer-box">
            <h3>AI Answer</h3>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default AssistantPage;