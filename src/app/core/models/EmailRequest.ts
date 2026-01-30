export interface EmailRequest {
  to: string;
  subject: string;
  // body?: string; // opcional, si quieres agregarlo luego
  isHtml: boolean;
  usu: string;
  pass: string;
  codemp: number;
  idempresa: number;
}
