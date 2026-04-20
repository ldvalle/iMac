/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Lock,
  User,
  ShieldCheck,
  AlertCircle,
  Loader2,
  Printer, 
  Mail, 
  LayoutDashboard, 
  Users, 
  Settings, 
  Briefcase, 
  FileText,
  Menu,
  X,
  Plus
} from "lucide-react";
import React, { useState, useEffect } from "react";
import MiEscritorio from "./sistemas/general/modulos/miEscritorio/MiEscritorio";

type Module = "dashboard" | "users" | "projects" | "documents" | "settings" | "miEscritorio";

interface ModuleConfig {
  id: Module;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("reMac_session_active") === "true";
  });
  const [authenticatedRole, setAuthenticatedRole] = useState<string>(() => {
    return localStorage.getItem("reMac_user_role") || "";
  });

  const [activeModule, setActiveModule] = useState<Module>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }));

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setAuthenticatedRole(role);
    localStorage.setItem("reMac_session_active", "true");
    localStorage.setItem("reMac_user_role", role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthenticatedRole("");
    localStorage.removeItem("reMac_session_active");
    localStorage.removeItem("reMac_user_role");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    window.location.href = "mailto:?subject=reMac Application&body=Enviado desde reMac App";
  };

  const modules: ModuleConfig[] = [
    { 
      id: "miEscritorio", 
      label: "Mi Escritorio", 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      content: <MiEscritorioView authenticatedRole={authenticatedRole} /> 
    },    
    { 
      id: "dashboard", 
      label: "Dashboard", 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      content: <DashboardView /> 
    },
    { 
      id: "users", 
      label: "Usuarios", 
      icon: <Users className="w-5 h-5" />, 
      content: <UsersView /> 
    },
    { 
      id: "projects", 
      label: "Proyectos", 
      icon: <Briefcase className="w-5 h-5" />, 
      content: <ProjectsView /> 
    },
    { 
      id: "documents", 
      label: "Documentos", 
      icon: <FileText className="w-5 h-5" />, 
      content: <DocumentsView /> 
    },
    { 
      id: "settings", 
      label: "Configuración", 
      icon: <Settings className="w-5 h-5" />, 
      content: <SettingsView /> 
    },
  ];

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full flex-col font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center border-b border-glass-border bg-black/30 backdrop-blur-[12px] px-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-accent" />}
          </button>
          <h1 className="text-2xl font-extrabold tracking-tighter text-accent">
            reMac
          </h1>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-3">
            <ToolbarButton icon={<Printer className="w-4 h-4" />} label="Imprimir" onClick={handlePrint} />
            <ToolbarButton icon={<Mail className="w-4 h-4" />} label="Email" onClick={handleSendEmail} />
            <ToolbarButton icon={<Plus className="w-4 h-4" />} label="Nuevo" onClick={() => {}} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-16 pb-12">
        {/* Sidebar */}
        <aside 
          className={`fixed left-0 top-16 bottom-9 z-20 transition-all duration-300 border-r border-glass-border bg-black/20 backdrop-blur-md overflow-hidden ${
            isSidebarOpen ? "w-[240px]" : "w-0 md:w-20"
          }`}
        >
          <nav className="flex flex-col gap-1 p-3 pt-6">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-all ${
                  activeModule === module.id 
                    ? "bg-accent text-black font-semibold shadow-lg shadow-accent/20" 
                    : "hover:bg-glass text-text-dim hover:text-white"
                }`}
              >
                <div className="shrink-0">{module.icon}</div>
                {(isSidebarOpen || (activeModule === module.id)) && (
                  <span className={`text-sm tracking-tight whitespace-nowrap overflow-hidden transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 md:hidden"}`}>
                    {module.label}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main 
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "ml-[240px]" : "ml-0 md:ml-20"
          } p-8`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              {modules.find(m => m.id === activeModule)?.content}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 flex h-9 items-center justify-between border-t border-glass-border bg-black/40 backdrop-blur-xl px-6 text-[11px] text-text-dim font-medium tracking-tight">
        <div className="flex items-center gap-2">
          <span className="uppercase">Rol Activo:</span>
          <span className="bg-accent/10 text-accent px-2 py-0.5 rounded text-[10px] font-bold border border-accent/20">
            {authenticatedRole.toUpperCase()}
          </span>
          <button 
            onClick={handleLogout}
            className="ml-4 hover:text-white transition-colors uppercase text-[9px] border-l border-white/10 pl-4"
          >
            Cerrar Sesión
          </button>
        </div>
        <div className="uppercase">
          {currentDate} — GMT-3
        </div>
      </footer>
    </div>
  );
}

function ToolbarButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-glass border border-glass-border hover:bg-white/10 rounded-md transition-all text-[13px] text-text-bright group"
    >
      <span className="group-active:scale-95 transition-transform">{icon}</span>
      <span className="hidden sm:inline font-medium">{label}</span>
    </button>
  );
}

function LoginScreen({ onLoginSuccess }: { onLoginSuccess: (role: string) => void }) {
  const [rol, setRol] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8210/macPhoenix/ValidarRol", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rol, password }),
      });

      if (!response.ok) {
        throw new Error("Error en la conexión con el servidor");
      }

      const data = await response.json();

      if (data.resultado === "OK") {
        onLoginSuccess(data.rol || rol);
      } else {
        setError("Credenciales inválidas. Por favor, intente de nuevo.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("No se pudo conectar con el servicio de autenticación. Verifique que el servicio en http://localhost:8210 esté activo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-brand-bg relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-black/30 backdrop-blur-2xl border border-glass-border rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4 border border-accent/20">
              <ShieldCheck className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-accent mb-2">reMac</h1>
            <p className="text-text-dim text-sm text-center">Ingrese sus credenciales para acceder al sistema centralizado.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-dim ml-1">Rol / Usuario</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                <input 
                  type="text" 
                  value={rol}
                  onChange={(e) => setRol(e.target.value)}
                  placeholder="Ej: Administrador"
                  className="w-full bg-glass border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-text-dim/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-dim ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-glass border border-glass-border rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-text-dim/50"
                  required
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-200 leading-relaxed">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-accent hover:bg-accent/90 text-black font-extrabold py-3 rounded-xl transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  ACCEDER AL SISTEMA
                  <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-glass-border text-center">
            <p className="text-[10px] uppercase font-bold tracking-widest text-text-dim">
              © 2026 reMac Systems Division — v4.0.1
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Module Views Placeholder */

function DashboardView() {
  return (
    <div className="space-y-8">
      <header className="module-header">
        <h2 className="text-[28px] font-bold tracking-tight">Panel de Control</h2>
        <p className="text-text-dim mt-1">Bienvenido al sistema de gestión centralizada reMac.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Solicitudes Pendientes", value: "14" },
          { label: "Rendimiento Global", value: "98.2%" },
          { label: "Usuarios Activos", value: "1,204" }
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-xl bg-glass border border-glass-border backdrop-blur-sm group">
            <h3 className="text-[12px] uppercase tracking-[1px] font-semibold text-text-dim mb-3">{stat.label}</h3>
            <div className="text-3xl font-bold text-accent">{stat.value}</div>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-xl bg-glass border border-glass-border backdrop-blur-sm">
        <h3 className="text-[12px] uppercase tracking-[1px] font-semibold text-text-dim mb-4">Actividad Reciente</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-glass-border text-text-dim text-[11px] uppercase tracking-wider">
                <th className="pb-3 px-2">Usuario</th>
                <th className="pb-3 px-2">Módulo</th>
                <th className="pb-3 px-2">Acción</th>
                <th className="pb-3 px-2">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { user: "Carlos Ruiz", mod: "Inventario", action: "Actualización Stock", status: "Completado", color: "text-green-400" },
                { user: "Elena Gomez", mod: "Reportes", action: "Exportación PDF", status: "Completado", color: "text-green-400" },
                { user: "Marcos Paz", mod: "Seguridad", action: "Cambio Password", status: "Fallido", color: "text-red-400" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-2 font-medium">{row.user}</td>
                  <td className="py-3 px-2 text-text-dim">{row.mod}</td>
                  <td className="py-3 px-2 text-text-dim">{row.action}</td>
                  <td className={`py-3 px-2 font-semibold ${row.color}`}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function UsersView() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h2>
      <div className="rounded-xl bg-glass border border-glass-border overflow-hidden backdrop-blur-sm">
        <div className="p-4 border-b border-glass-border bg-white/5 text-[11px] uppercase tracking-wider font-bold text-text-dim grid grid-cols-3">
          <span>Nombre</span>
          <span>Email</span>
          <span>Acciones</span>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border-b border-white/5 grid grid-cols-3 items-center hover:bg-white/5 transition-colors">
            <span className="font-medium">Usuario {i}</span>
            <span className="text-text-dim">usuario{i}@remac.com</span>
            <div className="flex gap-2">
              <button className="text-[11px] uppercase font-bold tracking-wider px-3 py-1.5 rounded bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors">Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsView() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Proyectos</h2>
      <div className="grid grid-cols-1 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="p-6 rounded-xl bg-glass border border-glass-border backdrop-blur-sm flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Proyecto Alfa {i}</h3>
              <p className="text-text-dim text-sm mt-1">Desarrollo de infraestructura modular.</p>
            </div>
            <span className="px-3 py-1 rounded bg-accent/10 text-accent text-[10px] font-extrabold uppercase tracking-widest border border-accent/20">En Proceso</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsView() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Documentación</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square rounded-xl bg-glass border border-glass-border backdrop-blur-sm flex flex-col items-center justify-center gap-3 hover:bg-white/5 cursor-pointer transition-all">
            <FileText className="w-8 h-8 text-text-dim" />
            <span className="text-[11px] font-bold text-text-bright uppercase tracking-wider">{`Doc_00${i}.pdf`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
      <div className="max-w-md space-y-4">
        {[
          "Notificaciones por Email",
          "Modo Oscuro Automático",
          "Sincronización en la Nube",
          "Exportación de Reportes"
        ].map((item) => (
          <div key={item} className="flex items-center justify-between p-4 rounded-lg bg-glass border border-glass-border">
            <span className="font-medium text-sm">{item}</span>
            <div className="w-10 h-5 rounded-full bg-accent relative cursor-pointer opacity-80">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-black shadow-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiEscritorioView({ authenticatedRole }: { authenticatedRole: string }) {
  return <MiEscritorio authenticatedRole={authenticatedRole} />;
}
