import React, { useState, useEffect } from 'react';

interface RolResponse {
  rol: string;
}

interface Tarea {
  mensaje: number;
  referencia: string;
  rol_anterior: string;
  rol_actual: string;
  fecha_traspaso: string;
  etiqueta: string;
  proced: string;
}

interface MiEscritorioProps {
  authenticatedRole: string;
}

const MiEscritorio: React.FC<MiEscritorioProps> = ({ authenticatedRole }) => {
  const [roles, setRoles] = useState<string[]>([]);
  const [selectedRol, setSelectedRol] = useState<string>('');
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingTareas, setLoadingTareas] = useState(false);

  // Usar el rol logueado pasado como prop
  const loggedInRol = authenticatedRole;

  useEffect(() => {
    loadRoles();
  }, []);

  useEffect(() => {
    if (selectedRol) {
      loadTareas(selectedRol);
    }
  }, [selectedRol]);

  const loadRoles = async () => {
    setLoadingRoles(true);
    try {
      const response = await fetch('http://localhost:8210/macPhoenix/ListaRolRepre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol: loggedInRol })
      });
      const data: RolResponse[] = await response.json();
      const rolesList = data.map(item => item.rol);
      // Agregar el rol logueado si no está en la lista
      if (!rolesList.includes(loggedInRol)) {
        rolesList.unshift(loggedInRol);
      }
      setRoles(rolesList);
      setSelectedRol(loggedInRol); // Default
    } catch (error) {
      console.error('Error loading roles:', error);
    } finally {
      setLoadingRoles(false);
    }
  };

  const loadTareas = async (rol: string) => {
    setLoadingTareas(true);
    try {
      const response = await fetch('http://localhost:8210/macPhoenix/ListaTareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol })
      });
      const data: Tarea[] = await response.json();
      setTareas(data);
    } catch (error) {
      console.error('Error loading tareas:', error);
    } finally {
      setLoadingTareas(false);
    }
  };

  const handleLeer = () => {
    loadTareas(selectedRol);
  };

  const handleRefrescar = () => {
    loadTareas(selectedRol);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Frame 1: Rol Activo y botón Leer */}
      <h1>Mi Escritorio</h1>
      <div className="frame1 flex items-center gap-4 px-4 py-3 rounded-lg bg-glass border border-glass-border backdrop-blur-sm">
        <label htmlFor="rolSelect" className="text-sm font-semibold text-text-bright tracking-tight whitespace-nowrap">Rol Activo:</label>
        <select
          id="rolSelect"
          value={selectedRol}
          onChange={(e) => setSelectedRol(e.target.value)}
          disabled={loadingRoles}
          className="px-3 py-2 rounded-md bg-black/50 border border-glass-border text-white text-sm font-medium focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all disabled:opacity-50"
        >
          <option value="" disabled className="bg-black text-white">Seleccionar rol...</option>
          {roles.map(rol => <option key={rol} value={rol} className="bg-black text-white">{rol}</option>)}
        </select>
        <button
          onClick={handleLeer}
          disabled={loadingTareas}
          className="px-4 py-2 bg-accent text-black font-semibold rounded-md text-sm transition-all hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Leer
        </button>
      </div>

      {/* Frame 2: Grilla con tareas */}
      <div className="frame2 flex-1 overflow-auto rounded-lg bg-glass border border-glass-border backdrop-blur-sm">
        <div className="inline-block min-w-full">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-accent text-black sticky top-0">
                <th className="border border-glass-border p-3 text-left font-semibold">Nro.Mensaje</th>
                <th className="border border-glass-border p-3 text-left font-semibold">Referencia</th>
                <th className="border border-glass-border p-3 text-left font-semibold">Rol Anterior</th>
                <th className="border border-glass-border p-3 text-left font-semibold">Rol Actual</th>
                <th className="border border-glass-border p-3 text-left font-semibold">Fecha Traspaso</th>
                <th className="border border-glass-border p-3 text-left font-semibold">Etiqueta</th>
                <th className="border border-glass-border p-3 text-left font-semibold">Procedimiento</th>
              </tr>
            </thead>
            <tbody>
              {tareas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="border border-glass-border p-4 text-center text-text-dim">
                    {loadingTareas ? 'Cargando datos...' : 'No hay tareas para mostrar'}
                  </td>
                </tr>
              ) : (
                tareas.map((tarea, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors border-b border-glass-border">
                    <td className="border border-glass-border p-3 text-text-bright">{tarea.mensaje}</td>
                    <td className="border border-glass-border p-3 text-text-bright">{tarea.referencia}</td>
                    <td className="border border-glass-border p-3 text-text-bright">{tarea.rol_anterior}</td>
                    <td className="border border-glass-border p-3 text-text-bright">{tarea.rol_actual}</td>
                    <td className="border border-glass-border p-3 text-text-bright">{tarea.fecha_traspaso}</td>
                    <td className="border border-glass-border p-3 text-text-bright">{tarea.etiqueta}</td>
                    <td className="border border-glass-border p-3 text-text-bright">{tarea.proced}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botón Refrescar */}
      <div className="flex justify-end px-4 py-3">
        <button
          onClick={handleRefrescar}
          disabled={loadingTareas}
          className="px-4 py-2 bg-accent text-black font-semibold rounded-md text-sm transition-all hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingTareas ? 'Cargando...' : 'Refrescar'}
        </button>
      </div>
    </div>
  );
};

export default MiEscritorio;