"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://127.0.0.1:8000/dashboard", {
        headers: { Authorization: `Bearer TOKEN_AQUI` },
      });
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#A8E6CF] p-8">
      <h1 className="text-4xl font-bold text-[#333] mb-8 text-center">
        MiFichaMed Dashboard
      </h1>

      {/* Contenedor de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tarjeta de perfil */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#56C596] mb-4">Perfil</h2>
          <p className="text-gray-700">Nombre: Juan Pérez</p>
          <p className="text-gray-700">Edad: 32</p>
          <p className="text-gray-700">Correo: juanperez@email.com</p>
        </div>

        {/* Tarjeta de condiciones */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#56C596] mb-4">Condiciones</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Hipertensión</li>
            <li>Diabetes Tipo 2</li>
          </ul>
        </div>

        {/* Tarjeta de medicamentos */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#56C596] mb-4">Medicamentos</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Metformina</li>
            <li>Lisinopril</li>
          </ul>
        </div>

        {/* Tarjeta de síntomas */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#56C596] mb-4">Síntomas</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Dolor de cabeza</li>
            <li>Cansancio</li>
          </ul>
        </div>

        {/* Tarjeta de estadísticas */}
        <div className="bg-white rounded-xl shadow-md p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-[#56C596] mb-4">Estadísticas</h2>
          {data ? (
            <pre className="bg-gray-100 p-4 rounded text-sm text-gray-700">
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-600">Cargando datos...</p>
          )}
        </div>
      </div>
    </main>
  );
}