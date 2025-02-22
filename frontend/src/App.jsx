import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import prism from "prismjs";
import "./App.css";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const App = () => {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const reviewCode = async () => {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review. Please try again later.");
    }
  };

  return (
    <main className="container">
      <div className="editor-container" style={{ flex: 1 }}>
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
          padding={10}
          style={{
            fontSize: 16,
            border: "1px solid #ccc",
            borderRadius: "8px",
            height: "100%",
            width: "100%",
            color: "#e0e0e0", // Improved visibility
            backgroundColor: "#1e1e1e",
          }}
        />
        <button onClick={reviewCode} className="review-button">
          Review
        </button>
      </div>
      <div className="review-container" style={{ flex: 1, overflow: "auto", wordWrap: "break-word", padding: "1rem" }}>
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
};

export default App;
