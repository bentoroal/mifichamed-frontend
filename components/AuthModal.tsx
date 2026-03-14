"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({ open, onClose }: any) {

  const [mode, setMode] = useState<"login" | "register">("login");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] bg-white rounded-xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-8 py-6">
          <h2 className="text-xl font-bold">
            {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h2>

          <button
            onClick={onClose}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="px-8 pt-8 pb-10">

          {mode === "login" ? (
            <LoginForm />
          ) : (
            <RegisterForm />
          )}

          {/* SWITCH */}
          <div className="mt-6 text-center text-sm">

            {mode === "login" ? (
              <>
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="font-bold text-teal-600"
                >
                  Regístrate
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="font-bold text-teal-600"
                >
                  Inicia sesión
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}