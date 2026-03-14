"use client";

import { useEffect } from "react";

export default function RegisterModal({ open, onClose }: any) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose} // click fuera cierra
    >
      <div
        className="w-full max-w-[480px] bg-white rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()} // evita cerrar si clic dentro
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-8 py-6">
          <h2 className="text-xl font-bold">MiFichaMed</h2>

          <button
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="px-8 pt-8 pb-10">
          <h1 className="text-3xl font-bold mb-4">Crea tu cuenta</h1>

          <form className="space-y-5">
            <input
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Correo"
              type="email"
            />

            <input
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Contraseña"
              type="password"
            />

            <input
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Confirmar contraseña"
              type="password"
            />

            <button className="w-full bg-teal-600 text-white py-4 rounded-lg font-bold">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}