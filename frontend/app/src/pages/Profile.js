import React from "react";

export function Profile() {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">👤 Perfil de Usuario</h2>
      <p className="text-gray-600 text-lg mb-4">Aquí se mostrarán tus envíos, estadísticas de resolución y posición en el ranking.</p>
      <div className="text-sm text-gray-500 italic">* Se incluirán gráficos de desempeño y progreso próximamente.</div>
    </div>
  );
}
