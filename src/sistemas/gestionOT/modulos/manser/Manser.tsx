import { number } from "motion";
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

//-- Interface Cabecera 
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
  sfc_caso: number | null;
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
  sfcCaso: number;
}

//-- Interface SOLAPA CLIENTE
interface ClienteManRetResponse {
  codigoResultado: string;
  numero_cliente: number;
  dv_numero_cliente: string;
  sucursal: string | number | null | undefined;
  tipo_empalme: string|null|undefined;
  potencia_contrato: number|null|undefined;  
  potencia_inst_fp: number|null|undefined;
  sector: string | null | undefined;
  zona: string | null | undefined;
  correlativo_ruta: string | number | null | undefined;
  nombre: string;
  nom_comuna: string|null;
  nom_calle: string|null;
  nom_provincia: string|null;
  nom_sucursal: string|null;
  nom_partido: string|null;
  nro_dir: string|null;
  piso_dir: string | null;
  depto_dir: string | null;
  nom_entre: string | null;
  nom_entre1: string | null;
  nom_barrio: string | null;
  telefono: string | null;
  cod_postal: number | null;
  tipo_cliente: string | null;
  descrip_tipo_cliente: string | null;
  obs_dir: string | null;
  info_adic_lectura: string | null;
  tipo_iva: string | null;
  tarifa: string | null;
  rut: string | null;
  actividad_economic: string | null;
  cod_propiedad: string | null;
  tip_doc: string | null;
  nro_doc: number | null;
  estado_cobrabilida: string | null;
  nro_subestacion: string | null;
  codigo_voltaje: string | null;
  descrip_voltaje: string | null;
  acometida: string | null;
  descrip_acometida: string | null;
  descrip_empalme: string | null;
}

interface ClienteManRetValues {
  codigoResultado: string;
  numeroCliente: string;
  dvNumeroCliente: string;
  tipoEmpalme: string;
  potenciaContrato: string;
  potenciaInstFP: string;
  sucursal: string;
  sector: string;
  zona: string;
  correlativoRuta: string;
  nombreCliente: string;
  nomComuna: string;
  nomCalle: string;
  nomProvincia: string;
  nomSucursal: string;
  nomPartido: string;
  nroDir: string;
  pisoDir: string;
  deptoDir: string;
  nomEntre: string;
  nomEntre1: string;
  nomBarrio: string;
  telefono: string;
  codPostal: string;
  tipoCliente: string;
  descripTipoCliente: string;
  obsDir: string;
  infoAdicLectura: string;
  tipoIva: string;
  tarifa: string;
  rut: string;
  actividadEconomica: string;
  codPropiedad: string;
  tipDoc: string;
  nroDoc: string;
  estadoCobrabilida: string;
  nroSubestacion: string;
  codigoVoltaje: string;
  descripVoltaje: string;
  acometida: string;
  descripAcometida: string;
  descripEmpalme: string;
}

//-- Interface SOLAPA MEDIDORES
//-- Medidor retirado o a retirar
interface MedidorRetiradoResponse{
  codResultado : string;
  marca_medidor : string;
  modelo_medidor : string;
  numero_medidor : number;
  constante : number|null;
  ultima_lect_activa : number|null;
  lectura_terreno : number|null;
  amperaje : string|null;
  descripcion : string|null;
  clave_montri : string|null;
  ultima_lect_reac : number|null;
  lectu_terreno_reac : number|null;
  serie : string|null;
  numero_precinto : number|null;
}

interface MedidorRetiradoValues{ 
  codResultado : string;  
  marcaMedidorRet : string;  
  modeloMedidorRet : string;
  nroMedidorRet : number;
  constanteRet : number;
  ultimaLectActivaRet : number;  
  lecturaTerrenoRet : number;
  amperajeRet : string;
  descripcionVoltajeRet : string;  
  claveMontriRet : string;
  ultimaLectReacRet : number;
  lecturaTerrenoReacRet : number;
  seriePrecintoRet : string;  
  nroPrecintoRet : number;
}

//-- Medidor Instalado 
interface MedidorInstaladoResponse{
    fecha_ejecucion : string;
    otf_hora_inicio : string;
    otf_hora_final : string;
    otf_lect_retiro : number | null;
    otf_lect_instal : number | null;
    lectu_instal_reac : number | null;
    otf_med_distinto : string | null;
    otf_modifica_red : string | null;
    otf_proyecto : string | null;
    cod_ejecutor : string | null;
    nombre_ejecutor : string | null;
    numero_med_ant : number | null;
    marca_med_ant : string | null;
    modelo_med_ant : string | null;
    numero_med_coloca : number | null;
    marca_med_coloca : string | null;
    modelo_med_coloca : string | null;
    serie_prec_retira : string | null;
    nro_prec_retira : number | null;
    serie_prec_coloca : string | null;
    nro_prec_coloca : number | null;
}

interface MedidorInstaladoValues{
    fechaEjecucion : string;
    otfHoraInicio : string;
    otfHoraFinal : string;
    otfLectRetiro : number | null;
    otfLectInstal : number | null;
    lectuInstalReac : number | null;
    otfMedDistinto : string | null;
    otfModificaRed : string | null;
    otfProyecto : string | null;
    codEjecutor : string | null;
    nombreEjecutor : string | null;
    numeroMedAnt : number | null;
    marcaMedAnt : string | null;
    modeloMedAnt : string | null;
    numeroMedColoca : number | null;
    marcaMedColoca : string | null;
    modeloMedColoca : string | null;
    seriePrecRetira : string | null;
    nroPrecRetira : number | null;
    seriePrecColoca : string | null;
}

const urlBase1 = "http://localhost:8210/iMacSrv/gestionOT/";

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
    <div className="grid min-w-0 grid-cols-[minmax(4.5rem,auto)_1fr] items-center gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-text-dim">
        {legend}
      </label>
      {children ?? (
        <span
          id={id}
          className="min-h-9 rounded-md border border-glass-border bg-black/30 px-3 py-2 text-xs text-text-bright"
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
          className="min-h-9 rounded-md border border-glass-border bg-black/30 px-3 py-2 text-xs text-text-bright"
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
        className="min-h-9 rounded-md border border-glass-border bg-black/50 px-3 py-2 text-xs text-text-bright transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20 disabled:opacity-70"
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
        className="min-h-9 min-w-0 w-full max-w-full rounded-md border border-glass-border bg-black/50 px-3 py-2 text-xs text-text-bright transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
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

  return <div className={`grid grid-cols-1 gap-1 ${columnClass}`}>{children}</div>;
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
  sfcCaso: 0,
};

const emptyClienteValues: ClienteManRetValues = {
  codigoResultado: "",
  numeroCliente: "",
  dvNumeroCliente: "",
  tipoEmpalme: "",
  potenciaContrato: "",
  potenciaInstFP: "",
  sucursal: "",
  sector: "",
  zona: "",
  correlativoRuta: "",
  nombreCliente: "",
  nomComuna: "",
  nomCalle: "",
  nomProvincia: "",
  nomSucursal: "",
  nomPartido: "",
  nroDir: "",
  pisoDir: "",
  deptoDir: "",
  nomEntre: "",
  nomEntre1: "",
  nomBarrio: "",
  telefono: "",
  codPostal: "",
  tipoCliente: "",
  descripTipoCliente: "",
  obsDir: "",
  infoAdicLectura: "",
  tipoIva: "",
  tarifa: "",
  rut: "",
  actividadEconomica: "",
  codPropiedad: "",
  tipDoc: "",
  nroDoc: "",
  estadoCobrabilida: "",
  nroSubestacion: "",
  codigoVoltaje: "",
  descripVoltaje: "",
  acometida: "",
  descripAcometida: "",
  descripEmpalme: "",
};

const emptyMedidorRetiradoValues: MedidorRetiradoValues = {
  codResultado: "",
  marcaMedidorRet: "",
  modeloMedidorRet: "",
  nroMedidorRet: 0,
  constanteRet: 0,
  ultimaLectActivaRet: 0,
  lecturaTerrenoRet: 0,
  amperajeRet: "",
  descripcionVoltajeRet: "",
  claveMontriRet: "",
  ultimaLectReacRet: 0,
  lecturaTerrenoReacRet: 0,
  seriePrecintoRet: "",
  nroPrecintoRet: 0,
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

function combineSucursal(sucursal: string | number | null | undefined, nombreSucursal: string | null | undefined) {
  const codigo = valueToString(sucursal).trim();
  const nombre = valueToString(nombreSucursal).trim();
  if (codigo && nombre) return `${codigo}-${nombre}`;
  return codigo || nombre;
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
  const [cabeceraLoaded, setCabeceraLoaded] = useState(false);

  const [cliente, setCliente] = useState<ClienteManRetValues>({
    ...emptyClienteValues
  });
  const [, setClienteLoading] = useState(false);
  const [, setClienteError] = useState<string | null>(null);

  const [medidorRetirado, setMedidorRetirado] = useState<MedidorRetiradoValues>({
    ...emptyMedidorRetiradoValues
  });
  const [, setMedidorRetiradoLoading] = useState(false);
  const [, setMedidorRetiradoError] = useState<string | null>(null); 

  const nroMensajeNumber = Number(nroMensaje);
  const hasValidNroMensaje = Number.isFinite(nroMensajeNumber) && nroMensajeNumber > 0;

  useEffect(() => {
    const controller = new AbortController();

    async function loadMotivos() {
      setMotivosLoading(true);
      setMotivosLoaded(false);
      setMotivosError(null);

      try {
        const res = await fetch(urlBase1 +"getMotivosOT", {
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
    setCabeceraLoaded(false);
    setCliente({ ...emptyClienteValues });
  }, [nroMensaje]);


  useEffect(() => {
    if (!hasValidNroMensaje || motivosLoading || !motivosLoaded) return;

    const controller = new AbortController();

    async function loadCabecera() {
      setCabeceraLoading(true);
      setCabeceraLoaded(false);
      setCabeceraError(null);

      try {
        const res = await fetch(urlBase1 + "getCabeceraManRet", {
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
            sfcCaso: row.sfc_caso == null ? current.sfcCaso : Number.isFinite(row.sfc_caso) ? row.sfc_caso : 0,
          };
        });
        setCabeceraLoaded(true);

      } catch (e) {
        if ((e as { name?: string } | null)?.name === "AbortError") return;
        setCabeceraError("No se pudo cargar la cabecera");
        setCabeceraLoaded(false);
      } finally {
        setCabeceraLoading(false);
      }
    }

    void loadCabecera();

    return () => controller.abort();
  }, [hasValidNroMensaje, motivos, motivosLoaded, motivosLoading, nroMensajeNumber]);

  useEffect(() => {
    if (!cabeceraLoaded) return;

    const nroMensajeNumber = Number(cabecera.nroMensaje);
    const nroClienteNumber = Number(cabecera.nroCliente);
    const estadoManser = String(cabecera.etapaOperacion);

    if (!Number.isFinite(nroClienteNumber) || nroClienteNumber <= 0) {
      setCliente({ ...emptyClienteValues });
      return;
    }

    const controller = new AbortController();

    async function loadCliente() {
      setClienteLoading(true);
      setClienteError(null);

      try {
        const res = await fetch(urlBase1 + "getDataClienteManRet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ nroCliente: nroClienteNumber }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data: unknown = await res.json();
        const row = (Array.isArray(data) ? data[0] : data) as ClienteManRetResponse | undefined;

        if (!row || typeof row !== "object") {
          throw new Error("Respuesta invalida");
        }

        setCliente({
          codigoResultado: valueToString(row.codigoResultado),
          numeroCliente: valueToString(row.numero_cliente),
          dvNumeroCliente: valueToString(row.dv_numero_cliente),
          tipoEmpalme: valueToString(row.tipo_empalme),
          potenciaContrato: valueToString(row.potencia_contrato),
          potenciaInstFP: valueToString(row.potencia_inst_fp),
          sucursal: combineSucursal(row.sucursal, row.nom_sucursal),
          sector: valueToString(row.sector),
          zona: valueToString(row.zona),
          correlativoRuta: valueToString(row.correlativo_ruta),
          nombreCliente: valueToString(row.nombre),
          nomComuna: valueToString(row.nom_comuna),
          nomCalle: valueToString(row.nom_calle),
          nomProvincia: valueToString(row.nom_provincia),
          nomSucursal: valueToString(row.nom_sucursal),
          nomPartido: valueToString(row.nom_partido),
          nroDir: valueToString(row.nro_dir),
          pisoDir: valueToString(row.piso_dir),
          deptoDir: valueToString(row.depto_dir),
          nomEntre: valueToString(row.nom_entre),
          nomEntre1: valueToString(row.nom_entre1),
          nomBarrio: valueToString(row.nom_barrio),
          telefono: valueToString(row.telefono),
          codPostal: valueToString(row.cod_postal),
          tipoCliente: valueToString(row.tipo_cliente),
          descripTipoCliente: valueToString(row.descrip_tipo_cliente),
          obsDir: valueToString(row.obs_dir),
          infoAdicLectura: valueToString(row.info_adic_lectura),
          tipoIva: valueToString(row.tipo_iva),
          tarifa: valueToString(row.tarifa),
          rut: valueToString(row.rut),
          actividadEconomica: valueToString(row.actividad_economic),
          codPropiedad: valueToString(row.cod_propiedad),
          tipDoc: valueToString(row.tip_doc),
          nroDoc: valueToString(row.nro_doc),
          estadoCobrabilida: valueToString(row.estado_cobrabilida),
          nroSubestacion: valueToString(row.nro_subestacion),
          codigoVoltaje: valueToString(row.codigo_voltaje),
          descripVoltaje: valueToString(row.descrip_voltaje),
          acometida: valueToString(row.acometida),
          descripAcometida: valueToString(row.descrip_acometida),
          descripEmpalme: valueToString(row.descrip_empalme),
        });
      } catch (e) {
        if ((e as { name?: string } | null)?.name === "AbortError") return;
        setCliente({ ...emptyClienteValues });
        setClienteError("No se pudieron cargar los datos del cliente");
      } finally {
        setClienteLoading(false);
      }
    }

    void loadCliente();

    async function loadMedidorRetirado() {
      setMedidorRetiradoLoading(true);
      setMedidorRetiradoError(null);

      let endPointMedidorRetirado = "";
      var sJson;

      if(estadoManser.trim().toUpperCase() === "FINALIZADO" || estadoManser.trim().toUpperCase() === "FINALIZADA"){
        endPointMedidorRetirado = "getMedidorRetirado";
        //sJson = JSON.stringify({ nroMensaje: nroMensajeNumber, nroCliente: nroClienteNumber });
        sJson = { nroMensaje: nroMensajeNumber, nroCliente: nroClienteNumber };
      }else{
        endPointMedidorRetirado = "getMedidorClienteManRet";
        //sJson = JSON.stringify({ nroMensaje: nroMensajeNumber });
        sJson = { nroMensaje: nroMensajeNumber };
      }

      try {

        if(estadoManser.trim().toUpperCase() === "FINALIZADO" || estadoManser.trim().toUpperCase() === "FINALIZADA"){
          const res = await fetch(urlBase1 + endPointMedidorRetirado, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ nroCliente: nroClienteNumber, nroMensaje: nroMensajeNumber }),
            signal: controller.signal,
          });
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }

          const data: unknown = await res.json();
          const row = (Array.isArray(data) ? data[0] : data) as MedidorRetiradoResponse | undefined;

          if (!row || typeof row !== "object") {
            throw new Error("Respuesta invalida");
          }
          setMedidorRetirado({ 
            codResultado: valueToString(row.codResultado),  
            marcaMedidorRet: valueToString(row.marca_medidor),  
            modeloMedidorRet: valueToString(row.modelo_medidor),  
            nroMedidorRet: Number.isFinite(row.numero_medidor) ? row.numero_medidor : 0,  
            constanteRet: Number.isFinite(row.constante) ? row.constante : 0, 
            ultimaLectActivaRet: Number.isFinite(row.ultima_lect_activa) ? row.ultima_lect_activa : 0,  
            lecturaTerrenoRet: Number.isFinite(row.lectura_terreno) ? row.lectura_terreno : 0,  
            amperajeRet: valueToString(row.amperaje), 
            descripcionVoltajeRet: valueToString(row.descripcion),  
            claveMontriRet: valueToString(row.clave_montri),  
            ultimaLectReacRet: Number.isFinite(row.ultima_lect_reac) ? row.ultima_lect_reac : 0,  
            lecturaTerrenoReacRet: Number.isFinite(row.lectu_terreno_reac) ? row.lectu_terreno_reac : 0,  
            seriePrecintoRet: valueToString(row.serie), 
            nroPrecintoRet: Number.isFinite(row.numero_precinto) ? row.numero_precinto : 0, 
          });


        }else{
          const res = await fetch(urlBase1 + endPointMedidorRetirado, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ nroCliente: nroClienteNumber }),
            signal: controller.signal,
          });
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }

          const data: unknown = await res.json();
          const row = (Array.isArray(data) ? data[0] : data) as MedidorRetiradoResponse | undefined;

          if (!row || typeof row !== "object") {
            throw new Error("Respuesta invalida");
          }        
          setMedidorRetirado({ 
            codResultado: valueToString(row.codResultado),  
            marcaMedidorRet: valueToString(row.marca_medidor),  
            modeloMedidorRet: valueToString(row.modelo_medidor),  
            nroMedidorRet: Number.isFinite(row.numero_medidor) ? row.numero_medidor : 0,  
            constanteRet: Number.isFinite(row.constante) ? row.constante : 0, 
            ultimaLectActivaRet: Number.isFinite(row.ultima_lect_activa) ? row.ultima_lect_activa : 0,  
            lecturaTerrenoRet: Number.isFinite(row.lectura_terreno) ? row.lectura_terreno : 0,  
            amperajeRet: valueToString(row.amperaje), 
            descripcionVoltajeRet: valueToString(row.descripcion),  
            claveMontriRet: valueToString(row.clave_montri),  
            ultimaLectReacRet: Number.isFinite(row.ultima_lect_reac) ? row.ultima_lect_reac : 0,  
            lecturaTerrenoReacRet: Number.isFinite(row.lectu_terreno_reac) ? row.lectu_terreno_reac : 0,  
            seriePrecintoRet: valueToString(row.serie), 
            nroPrecintoRet: Number.isFinite(row.numero_precinto) ? row.numero_precinto : 0, 
          });

        }

      } catch (e) { 
        if ((e as { name?: string } | null)?.name === "AbortError") return;
        setMedidorRetirado({ ...emptyMedidorRetiradoValues });
        setMedidorRetiradoError("No se pudieron cargar los datos del medidor retirado");

      } finally {
        setMedidorRetiradoLoading(false);
      }
    }

    void loadMedidorRetirado();

    return () => controller.abort();
  }, [cabecera.nroCliente, cabeceraLoaded]);

  return (
    <div className="flex h-full min-h-0 flex-col space-y-4">
      <h1>Mantenimiento de Servicio</h1>

      <Frame id="frmCabecera" className="px-4 py-3">
        <DataGrid columns={5} >
          <div className="flex items-start justify-between">
          <div className="w-[180px]"> 
          <Field id="lblNroMensaje" legend="Nro.Mensaje" value={cabecera.nroMensaje} />
          </div>
          <div className="w-[250px] ">
          <Field id="lblRolCreacion" legend="Rol Creación" value={cabecera.rolCreacion} />
          </div>
          <div className="w-[250px]">
          <Field id="lblRolActual" legend="Rol Actual"value={cabecera.rolActual}/>
          </div>
          <div className="w-[200px]">
          <Field id="lblEtapa" legend="Etapa" value="MODIFICACION" />
          </div>
          <div className="w-[180px]">
          <Field id="lblCasoSF" legend="Caso SF" value={cabecera.sfcCaso} />
          </div>
          </div>
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
          {activeTab === "datosCliente" && <DatosClienteTab cliente={cliente} />}
          {activeTab === "medidores" && <MedidoresTab medidorRetirado={medidorRetirado}/>}
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

function DatosClienteTab({ cliente }: { cliente: ClienteManRetValues }) {
  return (
    <DataGrid columns={2}>
      <Field id="lblNombreCliente" legend="Nombre" value={cliente.nombreCliente} />
      <Field id="lblTelefono" legend="Telefono" value={cliente.telefono} />
      <Field id="lblNombreCalle" legend="Calle" value={cliente.nomCalle} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 w-[350px] ">
        <CompactField id="lblAltura" legend="Nro." value={cliente.nroDir} />
        <CompactField id="lblPiso" legend="Piso" value={cliente.pisoDir} />
        <CompactField id="lblDepto" legend="Depto" value={cliente.deptoDir} />
      </div>
      <Field id="lblEntreCalle1" legend="Entre Calle 1" value={cliente.nomEntre} />
      <Field id="lblEntreCalle2" legend="Entre Calle 2" value={cliente.nomEntre1} />
      <Field id="lblSucursal" legend="Sucursal" value={cliente.sucursal} />
      <div className="w-[250px] ">
        <Field id="lblCodPostal" legend="Cod.Postal" value={cliente.codPostal} />
      </div>
      <Field id="lblBarrio" legend="Barrio" value={cliente.nomBarrio} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 w-[250px] ">
        <CompactField id="lblPlan" legend="Plan" value={cliente.sector} />
        <CompactField id="lblRadio" legend="Radio" value={cliente.zona} />
      </div>
      <Field id="lblLocalidad" legend="Localidad" value={cliente.nomComuna} /> 
      <div className="w-[250px] ">
        <Field id="lblCorrelativoRuta" legend="Correlativo Ruta" value={cliente.correlativoRuta} /> 
      </div>
      <Field id="lblPartido" legend="Partido" value={cliente.nomPartido} />
      <div className="w-[250px] ">
        <Field id="lblTipoConexion" legend="Tipo conexión" value={cliente.tipoEmpalme} />
      </div>
      <Field id="lblProvincia" legend="Provincia" value={cliente.nomProvincia} />
      <div className="w-[450px] ">
        <Field id="lblAcometida" legend="Acometida" value={cliente.descripAcometida} />
      </div>
      <div className="w-[350px] ">
        <Field id="lblTensionContratada" legend="Tensión Contratada" value={cliente.descripVoltaje} />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 w-[450px] ">
        <CompactField id="lblCargaContratada" legend="Carga Contratada" value={cliente.potenciaContrato} />
        <CompactField id="lblCargaConectada" legend="Carga Conectada" value={cliente.potenciaInstFP} />
      </div>
      <Field id="lblCentroTransformacion" legend="Centro Transformación" value={cliente.nroSubestacion} />
      <Field id="lblEmpalme" legend="Empalme" value={cliente.descripEmpalme} />
    </DataGrid>
  );
}

function MedidoresTab({medidorRetirado}: {medidorRetirado: MedidorRetiradoValues}) {
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
          <Field id="lblNroMedidorReti" legend="Número" value={medidorRetirado.nroMedidorRet}/>
          <Field id="lblMarcaMedidorReti" legend="Marca" value={medidorRetirado.marcaMedidorRet} />
          <Field id="lblModeloMedidorReti" legend="Modelo" value={medidorRetirado.modeloMedidorRet} />
          <Field id="lblLecturaTerrenoActiva" legend="Lectura Terreno Activa" value={medidorRetirado.lecturaTerrenoRet} />
          <Field id="lblUltimaLecturaActiva" legend="Ult.Lectura Activa" value={medidorRetirado.ultimaLectActivaRet} />
          <Field id="lblFactorMultiplicacion" legend="Factor Mult." value={medidorRetirado.constanteRet} />
          <Field id="lblLecturaTerrenoReactiva" legend="Lectura Terreno Reactiva" value={medidorRetirado.lecturaTerrenoReacRet} />
          <Field id="lblUltimaLecturaReactiva" legend="Ult.Lect.Reactiva" value={medidorRetirado.ultimaLectReacRet} />
          <Field id="lblPrecintoRetira" legend="Precinto" value={ medidorRetirado.seriePrecintoRet + '-' + medidorRetirado.nroPrecintoRet } />
          <Field id="lblTension" legend="Tensión" value={medidorRetirado.descripcionVoltajeRet} />
          <Field id="lblAmperaje" legend="Amperaje" value={medidorRetirado.amperajeRet} />
          <Field id="lblFasesMedidor" legend="Tipo" value={medidorRetirado.claveMontriRet} />
        </DataGrid>
      </Frame>

      <Frame id="frmMedidorInstala" title="Medidor que se Instala" className="p-4 pt-0">
        <DataGrid>
          <Field id="lblNroMedidorInstal" legend="Número"  />
          <Field id="lblProyecto" legend="Proyecto" />
          <EmptyCell />
          <Field id="lblMarcaMedidorInstal" legend="Marca"  />
          <Field id="lblRetiraInstala" legend="Retira/Instala" />
          <EmptyCell />
          <Field id="lblModeloMedidorInstal" legend="Modelo"  />
          <Field id="lblLecturaInstalActiva" legend="Lect.Instal.Activa"  />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <CompactField id="lblLecturaInstalReactiva" legend="Lect.Instal.React."  />
            <CompactField id="lblPrecintoInstal" legend="Precinto"  />
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
