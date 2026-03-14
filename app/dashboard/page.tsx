// app/dashboard/page.tsx
"use client";
import { motion } from "motion/react";
import { Activity, Stethoscope, Pill, ShieldAlert, TrendingUp, FileText } from "lucide-react";
import MetricCard from "@/components/ui/MetricCard";
import DashboardCard from "@/components/ui/DashboardCard";

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-7xl p-6 md:p-10">
      {/* 1. Encabezado con Animación */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <p className="text-teal-600 font-bold mb-1">¡Hola Alex!</p>
        <h2 className="text-4xl font-black text-teal-950">Resumen de Salud</h2>
      </motion.div>

      {/* 2. Métricas */}
      <section className="mb-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <MetricCard label="Peso" value="72.5" unit="kg" />
          <MetricCard label="IMC" value="22.9" status="Normal" />
          {/* ... otros MetricCards */}
        </div>
      </section>

      {/* 3. Grid de Tarjetas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DashboardCard title="Enfermedades" icon={Activity} iconColor="text-red-400">
           {/* Contenido de la tarjeta */}
        </DashboardCard>
        <DashboardCard title="Síntomas" icon={Stethoscope} iconColor="text-blue-400">
          {/* Contenido de la tarjeta */}
        </DashboardCard>
        <DashboardCard title="Tratamientos" icon={Pill} iconColor="text-green-400">
          {/* Contenido de la tarjeta */}
        </DashboardCard>
        <DashboardCard title="Alergias" icon={ShieldAlert} iconColor="text-yellow-400">
          {/* Contenido de la tarjeta */}
        </DashboardCard>
      </div>
    </div>
  );
}