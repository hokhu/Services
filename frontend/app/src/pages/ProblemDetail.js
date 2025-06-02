import React from "react";
import { useParams } from "react-router-dom";

export function ProblemDetail() {
  const { id } = useParams();

  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🧠 Problema #{id}</h2>
      <p className="text-gray-600 mb-6">Aquí se mostrará el enunciado y un editor de código para que puedas enviar tu solución.</p>
      <div className="w-full h-64 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
        Editor de código (aquí puedes integrar CodeMirror o Monaco)
      </div>
    </div>
  );
}
