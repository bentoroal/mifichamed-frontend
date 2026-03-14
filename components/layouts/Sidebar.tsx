// components/layouts/Sidebar.tsx
import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Stethoscope, 
  Pill, 
  ShieldAlert, 
  Scissors, 
  FileText,
  BriefcaseMedical
} from "lucide-react";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, active }: NavItemProps) => (
  <a
    href="#"
    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
      active
        ? 'bg-teal-200/50 shadow-sm border border-teal-200 text-teal-900'
        : 'text-teal-700 hover:bg-white/60 hover:text-teal-900 hover:shadow-sm'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-teal-700' : 'text-teal-500 group-hover:text-teal-700'}`} />
    <span className={active ? 'font-bold' : 'font-medium'}>{label}</span>
  </a>
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
        <NavItem icon={LayoutDashboard} label="Resumen" active />
        <NavItem icon={Activity} label="Enfermedades" />
        <NavItem icon={Stethoscope} label="Síntomas" />
        <NavItem icon={Pill} label="Tratamientos" />
        <NavItem icon={ShieldAlert} label="Alergias" />
        <NavItem icon={Scissors} label="Cirugías" />
        
        <div className="pt-4 mt-4 border-t border-teal-200/50">
          <NavItem icon={FileText} label="Generar Informe" />
        </div>
      </nav>

      <div className="border-t border-teal-100 p-4">
        <div className="flex items-center gap-3 rounded-xl border border-teal-200 bg-white/40 p-3 shadow-sm backdrop-blur-sm">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-teal-100 ring-2 ring-white">
            <img
              alt="Alex Morgan"
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-semibold text-teal-900">Alex Morgan</p>
            <p className="truncate text-xs text-teal-600">alex.m@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}