import React, { useState, useEffect } from "react";

export function Home() {
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.onload = function () {
      if (window.voiceflow?.chat?.load) {
        window.voiceflow.chat.load({
          verify: { projectID: "683d07985e930b4a978b5eb9" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
          voice: {
            url: "https://runtime-api.voiceflow.com"
          },
          render: {
            mode: "embedded",
            target: document.getElementById("voiceflow-chat")
          }
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleRunCode = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/ejecutar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
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

      {/* Div para el chatbot de Voiceflow */}
      <div
        id="voiceflow-chat"
        style={{
          height: "500px",
          width: "100%",
          zIndex: 9999,
          position: "relative"
        }}
      ></div>
    </div>
  );
}
