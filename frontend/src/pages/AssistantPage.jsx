import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

function AssistantPage() {
  const [searchParams] = useSearchParams();

  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("English");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const autoQuestionSent = useRef(false);

  const askAssistant = async (customQuestion = "") => {
    const finalQuestion =
      typeof customQuestion === "string" && customQuestion.trim()
        ? customQuestion.trim()
        : question.trim();

    if (!finalQuestion) {
      alert("Please enter a question.");
      return;
    }

    try {
      setLoading(true);
      setAnswer("");
      setQuestion(finalQuestion);

      const response = await api.post("/ask", {
        question: finalQuestion,
        language: language,
      });

      setAnswer(response.data.answer);
    } catch (error) {
      console.error("AI Assistant error:", error);
      alert("AI Assistant failed. Check backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const autoQuestion = searchParams.get("question");

    if (autoQuestion && !autoQuestionSent.current) {
      autoQuestionSent.current = true;
      setQuestion(autoQuestion);
      askAssistant(autoQuestion);
    }
  }, [searchParams]);

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

        <button
          type="button"
          onClick={() => askAssistant()}
          disabled={loading}
        >
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