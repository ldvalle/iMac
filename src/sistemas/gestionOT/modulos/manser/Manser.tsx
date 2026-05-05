import React, { useState } from "react";

type TabKey = "datosCliente" | "medidores" | "observaciones";

interface FieldProps {
  id: string;
  legend: string;
  children?: React.ReactNode;
}

interface TextFieldProps {
  id: string;
  legend: string;
  type?: string;
  disabled?: boolean;
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

function Field({ id, legend, children }: FieldProps) {
  return (
    <div className="grid min-w-0 grid-cols-[minmax(7.5rem,auto)_1fr] items-center gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-text-dim">
        {legend}
      </label>
      {children ?? (
        <span
          id={id}
          className="min-h-9 rounded-md border border-glass-border bg-black/30 px-3 py-2 text-sm text-text-bright"
        />
      )}
    </div>
  );
}

function CompactField({ id, legend, children }: FieldProps) {
  return (
    <div className="grid min-w-0 grid-cols-[auto_minmax(3rem,1fr)] items-center gap-2">
      <label htmlFor={id} className="text-xs font-semibold text-text-dim">
        {legend}
      </label>
      {children ?? (
        <span
          id={id}
          className="min-h-9 rounded-md border border-glass-border bg-black/30 px-3 py-2 text-sm text-text-bright"
        />
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

function SelectField({ id, legend, children }: { id: string; legend: string; children?: React.ReactNode }) {
  return (
    <Field id={id} legend={legend}>
      <select
        id={id}
        name={id}
        defaultValue=""
        className="min-h-9 rounded-md border border-glass-border bg-black/50 px-3 py-2 text-sm text-text-bright transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
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

function Manser() {
  const [activeTab, setActiveTab] = useState<TabKey>("datosCliente");

  return (
    <div className="flex h-full min-h-0 flex-col space-y-4">
      <h1>Mantenimiento de Servicio</h1>

      <Frame id="frmCabecera" className="px-4 py-3">
        <DataGrid columns={4}>
          <Field id="lblNroMensaje" legend="Nro.Mensaje" />
          <Field id="lblRolCreacion" legend="Rol Creación" />
          <Field id="lblRolActual" legend="Rol Actual" />
          <Field id="lblEtapa" legend="Etapa" />
        </DataGrid>
      </Frame>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
      <Frame id="frmDataBase" className="px-4 py-4">
        <DataGrid>
          <Field id="lblNroOperacion" legend="Nro.Operación" />
          <Field id="lblEtapaOperacion" legend="Etapa" />
          <InputField id="dtFechaVto" legend="Vencimiento" type="date" />
          <Field id="lblNroOrden" legend="Nro.de Orden" />
          <Field id="lblEstadoOT" legend="Estado OT" />
          <Field id="lblNroOrdenSAP" legend="Nro.Orden SAP" />
          <Field id="lblFechaOperacion" legend="Fecha Operación" />
          <Field id="lblAreaEmisora" legend="Area Emisora" />
          <EmptyCell />
          <Field id="txtNroCliente" legend="Nro.de Cliente">
            <div className="grid grid-cols-[1fr_3.25rem] gap-2">
              <input
                id="txtNroCliente"
                name="txtNroCliente"
                type="number"
                step="1"
                className="min-h-9 rounded-md border border-glass-border bg-black/50 px-3 py-2 text-sm text-text-bright transition-all focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/20"
              />
              <span
                id="lblDigVerifCliente"
                className="min-h-9 rounded-md border border-glass-border bg-black/30 px-3 py-2 text-center text-sm text-text-bright"
              />
            </div>
          </Field>
          <SelectField id="cmbMotivo" legend="Motivo" />
          <SelectField id="cmdFaseMedidor" legend="Tipo Medidor">
            <option value="1" className="bg-black text-white">
              Monofásico
            </option>
            <option value="3" className="bg-black text-white">
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
