export interface EmpAntiguedad {
  ID_CONTRATO: number;
  IDENTIFICACION: string;
  FECHA_DESDE: string | Date;
  FECHA_HASTA: string | Date | null;
  ID_EMPRESA: number;
  OBSERVACION: string | null;
  TIPCONTRATO: string | null;
  TERM_CONTRATO: string | null;
  ESTADO_REGISTRO: string | null;
  DETALLE_TERM: string | null;
}