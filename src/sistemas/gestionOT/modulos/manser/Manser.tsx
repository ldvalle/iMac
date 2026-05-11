import React, { useEffect, useState } from "react";

type TabKey = "datosCliente" | "medidores" | "observaciones";

interface ManserProps {
  nroMensaje?: number | string;
}

interface FieldProps {
  id: string;
  legend: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
}

interface TextFieldProps {
  id: string;
  legend: string;
  type?: string;
  disabled?: boolean;
}

interface CabeceraManRetResponse {
  mensaje_xnear: number | null;
  numero_orden: string | null;
  etapa: string | null;
  fecha_creacion: Date | null;
  rol_creacion: string | null;
  rol_actual: string | null;
  area: string | null;
  ident_etapa: string | null;
  tema: string | null;
  trabajo: string | null;
  desc_motivo: string | null;
  nro_orden_sap: string | null;
  estado: string | null;
  fecha_vto: string | null;
  tipo_trabajo: string | null;
  numero_cliente: number | null;
}

interface CabeceraManRetValues {
  nroMensaje: string;
  nroOrden: string;
  etapaOperacion: string;
  fechaOperacion: Date;
  rolCreacion: string;
  rolActual: string;
  areaEmisora: string;
  identEtapa: string;
  cmbMotivo: string;
  nroOrdenSAP: string;
  estadoOT: string;
  fechaVto: string;
  cmbFaseMedidor: string;
  nroCliente: string;
}

function Frame({ id, title, children, className = "" }: { id: string; title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`rounded-lg bg-glass border border-glass-border backdrop-blur-sm ${className}`}>
      {title && (
        <div className="border-b border-glass-border px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-accent">
          {title}
        </div>
      )}
      {children}
    </section>
  );
}

function Field({ id, legend, value, children }: FieldProps) {
  return (
    <div className="grid min-w-0 grid-cols-[minmax(7.5rem,auto)_1fr] items-center gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-text-dim">
        {legend}
      </label>
      {children ?? (
        <span
          id={id}
          className="min-h-9 rounded-md border border-glass-border bg-black/30 px-3 py-2 text-sm text-text-bright"
        >
          {value ?? ""}
        </span>
      )}
    </div>
  );
}

function CompactField({ id, legend, value, children }: FieldProps) {
  return (
    <div className="grid min-w-0 grid-cols-[auto_minmax(3rem,1fr)] items-center gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-text-dim">
        {legend}
      </label>
      {children ?? (
        <span
          id={id}
          className="min-h-9 rounded-md border border-glass-border bg-black/30 px-3 py-2 text-sm text-text-bright"
        >
          {value ?? ""}
        </span>
      )}
    </div>
  );
}

function InputField({ id, legend, type = "text", disabled = false }: TextFieldProps) {
  return (
    <Field id={id} legend={legend}>
      <input
        id={id}
        name={id}
        type={type}
        disabled={disabled}
        className="min-h-9 rounded-md border border-glass-border bg-black/50 px-3 py-2 text-sm text-text-bright transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 disabled:opacity-70"
      />
    </Field>
  );
}

function SelectField({
  id,
  legend,
  value,
  onChange,
  children,
}: {
  id: string;
  legend: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  children?: React.ReactNode;
}) {
  return (
    <Field id={id} legend={legend}>
      <select
        id={id}
        name={id}
        value={value ?? ""}
        onChange={onChange ?? (() => {})}
        className="min-h-9 min-w-0 w-full max-w-full rounded-md border border-glass-border bg-black/50 px-3 py-2 text-sm text-text-bright transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
      >
        <option value="" disabled className="bg-black text-white">
          Seleccionar...
        </option>
        {children}
      </select>
    </Field>
  );
}

function CheckField({ id, legend }: { id: string; legend: string }) {
  return (
    <label htmlFor={id} className="flex min-h-9 items-center gap-2 text-xs font-semibold text-text-dim">
      <span>{legend}</span>
      <input
        id={id}
        name={id}
        type="checkbox"
        className="h-4 w-4 rounded border-glass-border bg-black/50 accent-accent"
      />
    </label>
  );
}

function DataGrid({ children, columns = 3 }: { children: React.ReactNode; columns?: 2 | 3 | 4 }) {
  const columnClass = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  }[columns];

  return <div className={`grid grid-cols-1 gap-3 ${columnClass}`}>{children}</div>;
}

function EmptyCell() {
  return <div className="hidden lg:block" />;
}

const emptyCabeceraValues: CabeceraManRetValues = {
  nroMensaje: "",
  nroOrden: "",
  etapaOperacion: "",
  fechaOperacion: null as Date | null,
  rolCreacion: "",
  rolActual: "",
  areaEmisora: "",
  identEtapa: "",
  cmbMotivo: "",
  nroOrdenSAP: "",
  estadoOT: "",
  fechaVto: "",
  cmbFaseMedidor: "",
  nroCliente: "",
};

function valueToString(value: string | number | null | undefined) {
  return value === null || value === undefined ? "" : String(value);
}

function toDateInputValue(value: string | null | undefined) {
  if (!value) return "";
  const isoDate = value.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  if (isoDate) return isoDate;

  const parts = value.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  if (!parts) return value;
  return `${parts[3]}-${parts[2]}-${parts[1]}`;
}

function getFaseMedidorValue(tipoTrabajo: string | null | undefined) {
  if (!tipoTrabajo) return "";
  return tipoTrabajo.slice(-2) === "01" ? "M" : "T";
}

function normalizeLookupValue(value: string | number | null | undefined) {
  const rawValue = valueToString(value).trim();
  if (!rawValue) return "";

  const numericValue = Number(rawValue);
  if (Number.isFinite(numericValue)) {
    return String(numericValue);
  }

  return rawValue.toUpperCase();
}

function getMotivoSelectValue(
  tema: string | null | undefined,
  motivos: Array<{ codigo: string; descripcion: string; valor_alf: string }>,
) {
  const normalizedTema = normalizeLookupValue(tema);
  if (!normalizedTema) return "";

  const selectedMotivo = motivos.find(
    (motivo) =>
      normalizeLookupValue(motivo.codigo.trim()) === normalizedTema ||
      normalizeLookupValue(motivo.valor_alf.trim()) === normalizedTema,
  );

  return selectedMotivo?.codigo ?? "";
}

function Manser({ nroMensaje }: ManserProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("datosCliente");
  const [motivos, setMotivos] = useState<Array<{ codigo: string; descripcion: string; valor_alf: string }>>([]);
  const [motivosLoading, setMotivosLoading] = useState(false);
  const [motivosLoaded, setMotivosLoaded] = useState(false);
  const [motivosError, setMotivosError] = useState<string | null>(null);
  const [cabecera, setCabecera] = useState<CabeceraManRetValues>({
    ...emptyCabeceraValues,
    nroMensaje: valueToString(nroMensaje),
  });
  const [, setCabeceraLoading] = useState(false);
  const [, setCabeceraError] = useState<string | null>(null);

  const nroMensajeNumber = Number(nroMensaje);
  const hasValidNroMensaje = Number.isFinite(nroMensajeNumber) && nroMensajeNumber > 0;

  useEffect(() => {
    const controller = new AbortController();

    async function loadMotivos() {
      setMotivosLoading(true);
      setMotivosLoaded(false);
      setMotivosError(null);

      try {
        const res = await fetch("http://localhost:8210/iMacSrv/gestionOT/getMotivosOT", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ procedimiento: "MANSER" }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: unknown = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("Respuesta inválida");
        }

        const parsed = data
          .map((item) => {
            if (!item || typeof item !== "object") return null;
            const row = item as Record<string, unknown>;
            const codigo = typeof row.codigo === "string" ? row.codigo : "";
            const descripcion = typeof row.descripcion === "string" ? row.descripcion : "";
            const valor_alf = typeof row.valor_alf === "string" ? row.valor_alf : "";
            if (!codigo || !descripcion) return null;
            return { codigo, descripcion, valor_alf };
          })
          .filter(Boolean) as Array<{ codigo: string; descripcion: string; valor_alf: string }>;

        setMotivos(parsed);
      } catch (e) {
        if ((e as { name?: string } | null)?.name === "AbortError") return;
        setMotivos([]);
        setMotivosError("No se pudieron cargar los motivos");
      } finally {
        setMotivosLoading(false);
        setMotivosLoaded(true);
      }
    }

    loadMotivos();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setCabecera({
      ...emptyCabeceraValues,
      nroMensaje: valueToString(nroMensaje),
    });
  }, [nroMensaje]);

  useEffect(() => {
    if (!hasValidNroMensaje || motivosLoading || !motivosLoaded) return;

    const controller = new AbortController();

    async function loadCabecera() {
      setCabeceraLoading(true);
      setCabeceraError(null);

      try {
        const res = await fetch("http://localhost:8210/iMacSrv/gestionOT/getCabeceraManRet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ nroMensaje: nroMensajeNumber }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: unknown = await res.json();
        if (!data || typeof data !== "object" || Array.isArray(data)) {
          throw new Error("Respuesta inválida");
        }

        const row = data as CabeceraManRetResponse;
        setCabecera((current) => {
          const motivoSelectValue = getMotivoSelectValue(row.tema, motivos);

          return {
            ...current,
            nroMensaje: row.mensaje_xnear == null ? current.nroMensaje : valueToString(row.mensaje_xnear),
            nroOrden: row.numero_orden == null ? current.nroOrden : valueToString(row.numero_orden),
            etapaOperacion: row.etapa == null ? current.etapaOperacion : valueToString(row.etapa),
            fechaOperacion: row.fecha_creacion == null ? current.fechaOperacion : new Date(row.fecha_creacion).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }),
            rolCreacion: row.rol_creacion == null ? current.rolCreacion : valueToString(row.rol_creacion),
            rolActual: row.rol_actual == null ? current.rolActual : valueToString(row.rol_actual),
            areaEmisora: row.area == null ? current.areaEmisora : valueToString(row.area),
            identEtapa: row.ident_etapa == null ? current.identEtapa : valueToString(row.ident_etapa),
            cmbMotivo: row.tema == null ? current.cmbMotivo : motivoSelectValue,
            nroOrdenSAP: row.nro_orden_sap == null ? current.nroOrdenSAP : valueToString(row.nro_orden_sap),
            estadoOT: row.estado == null ? current.estadoOT : valueToString(row.estado),
            fechaVto: row.fecha_vto == null ? current.fechaVto : toDateInputValue(row.fecha_vto),
            cmbFaseMedidor: row.tipo_trabajo == null ? current.cmbFaseMedidor : getFaseMedidorValue(row.tipo_trabajo),
            nroCliente: row.numero_cliente == null ? current.nroCliente : valueToString(row.numero_cliente),
          };
        });
      } catch (e) {
        if ((e as { name?: string } | null)?.name === "AbortError") return;
        setCabeceraError("No se pudo cargar la cabecera");
      } finally {
        setCabeceraLoading(false);
      }
    }

    loadCabecera();
    return () => controller.abort();
  }, [hasValidNroMensaje, motivos, motivosLoaded, motivosLoading, nroMensajeNumber]);

  return (
    <div className="flex h-full min-h-0 flex-col space-y-4">
      <h1>Mantenimiento de Servicio</h1>

      <Frame id="frmCabecera" className="px-4 py-3">
        <DataGrid columns={4}>
          <Field id="lblNroMensaje" legend="Nro.Mensaje" value={cabecera.nroMensaje} />
          <Field id="lblRolCreacion" legend="Rol Creación" value={cabecera.rolCreacion} />
          <Field id="lblRolActual" legend="Rol Actual"value={cabecera.rolActual}/>
          <Field id="lblEtapa" legend="Etapa" value="MODIFICACION" />
        </DataGrid>
      </Frame>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
      <Frame id="frmDataBase" className="px-4 py-4">
        <DataGrid>
          <Field id="lblNroOperacion" legend="Nro.Operación" value={cabecera.nroMensaje} />
          <Field id="lblEtapaOperacion" legend="Etapa" value={cabecera.etapaOperacion} />
          <Field id="dtFechaVto" legend="Vencimiento">
            <input
              id="dtFechaVto"
              name="dtFechaVto"
              type="date"
              value={cabecera.fechaVto}
              onChange={(e) => setCabecera((current) => ({ ...current, fechaVto: e.target.value }))}
              className="min-h-9 rounded-md border border-glass-border bg-black/50 px-3 py-2 text-sm text-text-bright transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 disabled:opacity-70"
            />
          </Field>
          <Field id="lblNroOrden" legend="Nro.de Orden" value={cabecera.nroOrden} />
          <Field id="lblEstadoOT" legend="Estado OT" value={cabecera.estadoOT} />
          <Field id="lblNroOrdenSAP" legend="Nro.Orden SAP" value={cabecera.nroOrdenSAP} />
          <Field id="lblFechaOperacion" legend="Fecha Operación" value={cabecera.fechaOperacion} />
          <Field id="lblAreaEmisora" legend="Area Emisora" value={cabecera.areaEmisora} />
          <EmptyCell />
          <Field id="txtNroCliente" legend="Nro.de Cliente">
            <div className="grid grid-cols-[1fr_3.25rem] gap-2">
              <input
                id="txtNroCliente"
                name="txtNroCliente"
                type="number"
                maxLength={10}
                style={{width: "170px"}}
                step="1"
                value={cabecera.nroCliente}
                onChange={(e) => setCabecera((current) => ({ ...current, nroCliente: e.target.value }))}
                className="min-h-9 rounded-md border border-glass-border bg-black/50 px-3 py-2 text-sm text-text-bright transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
              />
              <span
                id="lblDigVerifCliente"
                className="min-h-9 rounded-md border border-glass-border bg-black/30 px-3 py-2 text-left text-sm text-text-bright"
              />
            </div>
          </Field>
          <SelectField
            id="cmbMotivo"
            legend="Motivo"
            value={cabecera.cmbMotivo}
            onChange={(e) => setCabecera((current) => ({ ...current, cmbMotivo: e.target.value }))}
          >
            {motivosLoading && (
              <option value="__loading" disabled className="bg-black text-white">
                Cargando...
              </option>
            )}
            {!motivosLoading && motivosError && (
              <option value="__error" disabled className="bg-black text-white">
                {motivosError}
              </option>
            )}
            {!motivosLoading &&
              !motivosError &&
              motivos.map((m) => (
                <option key={m.codigo} value={m.codigo} className="bg-black text-white">
                  {m.descripcion}
                </option>
              ))}
          </SelectField>
          <SelectField
            id="cmbFaseMedidor"
            legend="Tipo Medidor"
            value={cabecera.cmbFaseMedidor}
            onChange={(e) => setCabecera((current) => ({ ...current, cmbFaseMedidor: e.target.value }))}
          >
            <option value="M" className="bg-black text-white">
              Monofásico
            </option>
            <option value="T" className="bg-black text-white">
              Trifásico
            </option>
          </SelectField>
        </DataGrid>
      </Frame>

      <Frame id="frmSolapas" className="overflow-hidden">
        <div className="flex border-b border-glass-border bg-black/20 px-3 pt-3">
          {[
            ["datosCliente", "Datos Cliente"],
            ["medidores", "Medidores"],
            ["observaciones", "Observaciones"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key as TabKey)}
              className={`rounded-t-md border border-b-0 px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === key
                  ? "border-glass-border bg-accent text-black"
                  : "border-transparent text-text-dim hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === "datosCliente" && <DatosClienteTab />}
          {activeTab === "medidores" && <MedidoresTab />}
          {activeTab === "observaciones" && <ObservacionesTab />}
        </div>
      </Frame>
      </div>

      <Frame id="frmBotonera" className="px-4 py-3">
        <div className="flex justify-end gap-3">
          {[
            ["cmdLeer", "Leer"],
            ["cmdEnviar", "Enviar"],
            ["cmdImprimir", "Imprimir"],
            ["cmdFinalizar", "Finalizar"],
          ].map(([id, label]) => (
            <button
              id={id}
              key={id}
              type="button"
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-accent/90"
            >
              {label}
            </button>
          ))}
        </div>
      </Frame>
    </div>
  );
}

function DatosClienteTab() {
  return (
    <DataGrid columns={2}>
      <Field id="lblNombreCliente" legend="Nombre" />
      <Field id="lblTelefono" legend="Telefono" />
      <Field id="lblNombreCalle" legend="Calle" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <CompactField id="lblAltura" legend="Nro." />
        <CompactField id="lblPiso" legend="Piso" />
        <CompactField id="lblDepto" legend="Depto" />
      </div>
      <Field id="lblEntreCalle1" legend="Entre Calle 1" />
      <Field id="lblEntreCalle2" legend="Entre Calle 2" />
      <Field id="lblSucursal" legend="Sucursal" />
      <Field id="lblCodPostal" legend="Cod.Postal" />
      <Field id="lblBarrio" legend="Barrio" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <CompactField id="lblPlan" legend="Plan" />
        <CompactField id="lblRadio" legend="Radio" />
      </div>
      <Field id="lblLocalidad" legend="Localidad" />
      <Field id="lblCorrelativoRuta" legend="Correlativo Ruta" />
      <Field id="lblPartido" legend="Partido" />
      <Field id="lblTipoConexion" legend="Tipo conexión" />
      <Field id="lblProvincia" legend="Provincia" />
      <Field id="lblAcometida" legend="Acometida" />
      <Field id="lblTensionContratada" legend="Tensión Contratada" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <CompactField id="lblCargaContratada" legend="Carga Contratada" />
        <CompactField id="lblCargaConectada" legend="Carga Conectada" />
      </div>
      <Field id="lblCentroTransformacion" legend="Centro Transformación" />
      <Field id="lblEmpalme" legend="Empalme" />
    </DataGrid>
  );
}

function MedidoresTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1fr_0.75fr_0.75fr_auto]">
        <InputField id="dtFechaPuesta" legend="Fecha Puesta en Servicio" type="date" />
        <InputField id="dtHoraInicio" legend="Hora Inicio" type="time" />
        <InputField id="dtHoraFin" legend="Hora Fin" type="time" />
        <CheckField id="chkModifRed" legend="Modifica Red" />
      </div>

      <Frame id="frmMedidorRetira" title="Medidor Retira" className="p-4 pt-0">
        <DataGrid>
          <Field id="lblNroMedidorReti" legend="Número" />
          <Field id="lblMarcaMedidorReti" legend="Marca" />
          <Field id="lblModeloMedidorReti" legend="Modelo" />
          <Field id="lblLecturaTerrenoActiva" legend="Lectura Terreno Activa" />
          <Field id="lblUltimaLecturaActiva" legend="Ult.Lectura Activa" />
          <Field id="lblFactorMultiplicacion" legend="Factor Mult." />
          <Field id="lblLecturaTerrenoReactiva" legend="Lectura Terreno Reactiva" />
          <Field id="lblUltimaLecturaReactiva" legend="Ult.Lect.Reactiva" />
          <Field id="lblPrecintoRetira" legend="Precinto" />
          <Field id="lblTension" legend="Tensión" />
          <Field id="lblAmperaje" legend="Amperaje" />
          <Field id="lblFasesMedidor" legend="Tipo" />
        </DataGrid>
      </Frame>

      <Frame id="frmMedidorInstala" title="Medidor que se Instala" className="p-4 pt-0">
        <DataGrid>
          <Field id="lblNroMedidorInstal" legend="Número" />
          <Field id="lblProyecto" legend="Proyecto" />
          <EmptyCell />
          <Field id="lblMarcaMedidorInstal" legend="Marca" />
          <Field id="lblRetiraInstala" legend="Retira/Instala" />
          <EmptyCell />
          <Field id="lblModeloMedidorInstal" legend="Modelo" />
          <Field id="lblLecturaInstalActiva" legend="Lect.Instal.Activa" />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <CompactField id="lblLecturaInstalReactiva" legend="Lect.Instal.React." />
            <CompactField id="lblPrecintoInstal" legend="Precinto" />
          </div>
        </DataGrid>
      </Frame>

      <Frame id="frmMedidorDistinto" className="px-4 py-3">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[auto_1fr_1fr_1fr]">
          <CheckField id="chkMedDistinto" legend="Medidor Distinto" />
          <Field id="lblNroMedDistinto" legend="Número" />
          <Field id="lblMarcaMedDistinto" legend="Marca" />
          <Field id="lblModeloDistinto" legend="Modelo" />
        </div>
      </Frame>
    </div>
  );
}

function ObservacionesTab() {
  return (
    <Frame id="frmObservaciones" className="h-[28rem] p-4">
      <div className="grid h-full grid-rows-[7fr_3fr] gap-3">
        <textarea
          id="txtTextonOld"
          name="txtTextonOld"
          disabled
          className="min-h-0 resize-none rounded-md border border-glass-border bg-black/30 p-3 text-sm text-text-bright disabled:opacity-80"
        />
        <textarea
          id="txtTextonNvo"
          name="txtTextonNvo"
          className="min-h-0 resize-none rounded-md border border-glass-border bg-black/50 p-3 text-sm text-text-bright transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
        />
      </div>
    </Frame>
  );
}

export default Manser;
