import Sidebar from "@/components/layouts/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden bg-[#f0fdfa]">
        {/* El Sidebar se queda fijo aquí */}
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto">
          {children} {/* Aquí se inyectará page.tsx */}
        </main>
      </div>
    </ProtectedRoute>
  );
}