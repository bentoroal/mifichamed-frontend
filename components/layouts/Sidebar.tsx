"use client";

import React from 'react';
import Link from "next/link"
import { logout } from "@/lib/auth"
import { LogOut } from "lucide-react"
import { 
  LayoutDashboard, 
  Activity, 
  Stethoscope, 
  Pill, 
  ShieldAlert, 
  Scissors, 
  FileText,
  BriefcaseMedical,
  SquareUserRound
} from "lucide-react";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, href, active }: NavItemProps) => (
  <Link
    href={href}
    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
      active
        ? 'bg-teal-200/50 shadow-sm border border-teal-200 text-teal-900'
        : 'text-teal-700 hover:bg-white/60 hover:text-teal-900 hover:shadow-sm'
    }`}
  >
    <Icon className={`w-5 h-5`} />
    <span className={active ? 'font-bold' : 'font-medium'}>
      {label}
    </span>
  </Link>
);

export default function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-teal-100 bg-[#ccfbf1] md:flex h-screen sticky top-0">
      <div className="flex h-20 items-center gap-3 px-6 border-b border-teal-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600/10 text-teal-700">
          <BriefcaseMedical className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-teal-900">MiFichaMed</h1>
          <p className="text-xs font-medium text-teal-600">Salud Personal</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <NavItem icon={LayoutDashboard} label="Resumen" href="/dashboard" />
        <NavItem icon={SquareUserRound} label="Perfil" href="/dashboard/profile" />
        <NavItem icon={Activity} label="Enfermedades" href="/dashboard/conditions" />
        <NavItem icon={Stethoscope} label="Síntomas" href="/dashboard/symptoms" />
        <NavItem icon={Pill} label="Tratamientos" href="/dashboard/treatments" />
        <NavItem icon={ShieldAlert} label="Alergias" href="/dashboard/allergies" />
        <NavItem icon={Scissors} label="Cirugías" href="/dashboard/surgeries" />
        <NavItem icon={FileText} label="Generar Informe" href="/dashboard/report" />
      </nav>

      <div className="border-t border-teal-100 p-4 space-y-3">


      {/* LOGOUT */}
      <button
        onClick={logout}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Cerrar sesión</span>
      </button>

    </div>
    </aside>
  );
}