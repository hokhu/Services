import React, { useState } from "react";

export function Home() {
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleRunCode = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/ejecutar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: code })
      });

      const data = await response.json();
      setOutput(data.output || data.error || "Sin salida");
    } catch (error) {
      setOutput("Error al conectar con la API.");
      console.error(error);
    }
  };

  return (
    <div className="content-box">
      <div className="language-selector mb-4">
        {["Python", "JavaScript", "Java"].map((lang) => (
          <button
            key={lang}
            className={`${language === lang ? "active" : ""}`}
            onClick={() => setLanguage(lang)}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="editor-box">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Escribe tu código ${language} aquí...`}
        />
      </div>

      <button className="run-button mb-4" onClick={handleRunCode}>
        Ejecutar código
      </button>

      <div className="output-box">
        <pre>{output}</pre>
      </div>
    </div>
  );
}
