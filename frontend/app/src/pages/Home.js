import React, { useState, useEffect } from "react";

export function Home() {
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState("");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    (function (d, t) {
      const v = d.createElement(t);
      const s = d.getElementsByTagName(t)[0];

      v.onload = function () {
        if (window.voiceflow?.chat?.load) {
          window.voiceflow.chat.load({
            verify: { projectID: "683d7ad75e930b4a978ba130" },
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

      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      v.type = "text/javascript";
      s.parentNode.insertBefore(v, s);
    })(document, "script");

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://cdn.voiceflow.com/widget-next/bundle.mjs"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const handleRunCode = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/ejecutar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, language, stdin: userInput })
      });

      const data = await response.json();
      const resultText = data.output || data.error || "Sin salida";
      console.log("SALIDA RAW:", data.output);
      setOutput(resultText);

    } catch (error) {
      setOutput("Error al conectar con la API.");
      console.error(error);
    }
  };

  return (
    <div className="home-layout">
      <div className="chatbot">
        <h2>Asistente de Código</h2>
        <div id="voiceflow-chat" style={{ height: "100%", width: "100%" }}></div>
      </div>

      <div className="code-editor">
        <div className="language-selector mb-4">
          {["Python"].map((lang) => (
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

        <div className="editor-box">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Escribe aquí los inputs que tu código necesita, separados por línea"
          />
        </div>

        <button className="run-button mb-4" onClick={handleRunCode}>
          Ejecutar código
        </button>

        <div
              className="output-box" style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{ __html: output.replace(/\n/g, "<br />") }}
            />
      </div>
    </div>
  );
}

