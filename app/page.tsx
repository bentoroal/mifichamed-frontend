/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { motion } from "motion/react";
import { 
  MedicalServices, 
  ArrowForward, 
  CheckCircle, 
  Monitoring, 
  Pill, 
  Description, 
  VerifiedUser, 
  VisibilityOff, 
  HealthMetrics,
  AppRegistration
} from "../components/icons";
import { FeatureCard } from "../components/FeatureCard";
import AuthModal from "../components/AuthModal";
import { useState } from "react";

export default function App() {
  const [openAuth, setOpenAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-teal-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MedicalServices className="text-teal-600 text-3xl" />
            <span className="text-2xl font-bold tracking-tight text-teal-900">
              MiFicha<span className="text-teal-600">Med</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-gray-600 hover:text-teal-600 transition-colors font-medium" href="#features">Funciones</a>
            <a className="text-gray-600 hover:text-teal-600 transition-colors font-medium" href="#about">Nosotros</a>
            <div className="flex items-center gap-4 ml-4">
              <button
                onClick={() => {
                  setAuthMode("login");
                  setOpenAuth(true);
                }}
                className="cursor-pointer px-5 py-2.5 text-teal-700 font-semibold hover:text-teal-800 transition-all"
              >
                Iniciar Sesión
              </button>

              <button
                onClick={() => {
                  setAuthMode("register");
                  setOpenAuth(true);
                }}
                className="cursor-pointer px-6 py-2.5 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 shadow-sm transition-all"
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-gradient pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Tu historial médico, <br />
              <span className="text-teal-600">siempre contigo.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
              Gestiona tus condiciones, síntomas y tratamientos en un solo lugar. MiFichaMed es la plataforma segura para tomar el control total de tu bienestar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-teal-600 text-white rounded-xl font-bold text-lg hover:bg-teal-700 shadow-lg shadow-teal-200 transition-all flex items-center justify-center gap-2">
                Comenzar ahora
                <ArrowForward className="text-2xl" />
              </button>
            </div>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/40 p-4 rounded-3xl backdrop-blur-sm border border-white/50 shadow-2xl">
              <img 
                alt="Healthcare digital tracking" 
                className="rounded-2xl shadow-sm w-full h-auto object-contain" 
                src="/images/dashboard.png"
              />
            </div>
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden lg:block max-w-xs border border-teal-50"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="text-green-600" />
                </div>
                <span className="font-bold text-gray-800">Tratamiento al día</span>
              </div>
              <p className="text-sm text-gray-500">Has registrado todos tus síntomas de esta semana satisfactoriamente.</p>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-teal-600 font-bold uppercase tracking-widest text-sm mb-4">Funcionalidades Clave</h2>
            <p className="text-4xl font-bold text-gray-900 mb-6">Todo lo que necesitas para cuidar tu salud</p>
            <p className="text-lg text-gray-600">Diseñado por profesionales para que puedas gestionar tu información médica de forma sencilla, rápida y segura.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Monitoring />}
              title="Seguimiento de Enfermedades y Síntomas"
              description="Registra la severidad, frecuencia y duración de tus síntomas y enfermedades diariamente. Visualiza tendencias que ayuden a tu médico a un mejor diagnóstico."
            />
            <FeatureCard 
              icon={<Pill />}
              title="Registro de Medicación"
              description="Manten un historial detallado del tratamiento farmacologico que estes siguiendo, su duración, frecuencia y efectos secundarios."
            />
            <FeatureCard 
              icon={<Description />}
              title="Reportes Médicos"
              description="Genera informes detallados de tu evolución en segundos. Compártelos con tus doctores vía PDF para consultas más productivas."
            />
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-24 px-6 bg-teal-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-800 rounded-full blur-3xl opacity-50 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-800 rounded-full blur-3xl opacity-50 -ml-48 -mb-48"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8 leading-tight">Privacidad y seguridad ante todo</h2>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-teal-500/20 p-2 rounded-full flex items-center justify-center">
                    <VerifiedUser className="text-teal-400 text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Encriptación de Datos</h4>
                    <p className="text-teal-100/70">Tus datos están protegidos con los estándares más altos de seguridad digital.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-teal-500/20 p-2 rounded-full flex items-center justify-center">
                    <VisibilityOff className="text-teal-400 text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Tú tienes el control</h4>
                    <p className="text-teal-100/70">Tú decides quién puede ver tu información y por cuánto tiempo.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-teal-800/40 p-12 rounded-3xl border border-teal-700/50 backdrop-blur-sm text-center">
              <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HealthMetrics className="text-teal-400 text-5xl" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">¿Listo para empezar?</h3>
              <p className="text-teal-100/80 mb-8">Únete a miles de personas que ya están tomando mejores decisiones sobre su salud con MiFichaMed.</p>
              <button className="w-full py-4 bg-white text-teal-900 rounded-xl font-bold text-lg hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
                <AppRegistration className="text-teal-600" />
                Registrarme Gratis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <MedicalServices className="text-teal-600 text-2xl" />
                <span className="text-xl font-bold tracking-tight text-teal-900">MiFicha<span className="text-teal-600">Med</span></span>
              </div>
              <p className="text-gray-500 leading-relaxed mb-6">
                Transformando la manera en que gestionamos nuestra salud personal de forma digital y segura.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-6">Plataforma</h5>
              <ul className="space-y-4 text-gray-600">
                <li><a className="hover:text-teal-600" href="#">Funciones</a></li>
                <li><a className="hover:text-teal-600" href="#">App Móvil</a></li>
                <li><a className="hover:text-teal-600" href="#">Seguridad</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-6">Empresa</h5>
              <ul className="space-y-4 text-gray-600">
                <li><a className="hover:text-teal-600" href="#">Sobre nosotros</a></li>
                <li><a className="hover:text-teal-600" href="#">Contacto</a></li>
                <li><a className="hover:text-teal-600" href="#">Blog de salud</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-6">Legal</h5>
              <ul className="space-y-4 text-gray-600">
                <li><a className="hover:text-teal-600" href="#">Privacidad</a></li>
                <li><a className="hover:text-teal-600" href="#">Términos</a></li>
                <li><a className="hover:text-teal-600" href="#">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© 2024 MiFichaMed. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a className="text-gray-400 hover:text-teal-600 transition-colors" href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
              </a>
              <a className="text-gray-400 hover:text-teal-600 transition-colors" href="#">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <AuthModal
      open={openAuth}
      onClose={() => setOpenAuth(false)}
    />
    </div>
  );
}

