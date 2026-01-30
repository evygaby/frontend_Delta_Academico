export class EMP {

        esnuevo?: boolean;    
       CODEMP?: string="";
        APELLIDO_PAT?: string="";
        APELLIDO_MAT?: string="";
        APELLIDO_CAS?: string="";
        NOMBRES?: string="";
        RAZONSOCIAL?: string="";
        SEXO?: string="";
        TIPO?: string="";
        RUC?: string="";
        DIRECCION?: string="";
        CODZONA?: string="";
        TLF1?: string="";
        TLF2?: string="";
        PAIS?: string="";
        PROVINCIA?: string="";
        CIUDAD?: string="";
        FECINGRESO?: Date=new Date;
        FECSALIDA?: string="";
        SEGSOCIAL?: string="";
        NUMCEDULA?: string="";
        ESTCIVIL?: string="";
        PROFESION?: string="";
        TIPCONTRATO?: string="";
        SUELDO?: number=0;
        CODCCOSTO?: string="";
        FECNAC?: string="";
        NUMEXT?: number=0;
        NUMHIJOS?:string="";
        NUMDIAS?:string="";
        ACTIVO?: string="";
        ACTIVO_REPORTES_AUMENTOS1?: boolean;
        ACTIVO1?: boolean;
        SEGURO?: string="";
        CODPERSONA?: string="";
        CELULAR?: string="";
        MNT_DIC?: number=0;
        HOR_DIC?: number=0;
        BENEFICIO?:string="";
        CODGRUPO?: number;
        MNT_ABRIL?: number=0;
        MNT_ABRIL1?: number=0;
        MNT_ABRIL2?: number=0;
        MNT_DIC_2000?: number=0;
        CODCATEGORIA?: string="";
        ACTIVO_REPORTES_AUMENTOS?: string=""; 
        DEDUCCION?: number=0;
        LIC_MATERNIDAD?: string="";
        FEC_MATERNIDADI?: string="";
        FEC_MATERNIDADF?: string="";
        LIC_ENFERMEDAD?: string="";
        FEC_ENFERMEDADI?: string="";
        FEC_ENFERMEDADF?: string="";
        NOMBRE_INVITACION?: string="";
        REQUIERE_TRANSP?: string="";
        CALLE_SRI?: string="";
        NUMERO_SRI?: number=0;
        ASISTE_L?: string="";
        ASISTE_M?: string="";
        ASISTE_C?: string="";
        ASISTE_J?: string="";
        ASISTE_V?: string="";
        SUELDO_DIC?: number=0;
        ANIOS_DOCENCIA?: number=0;
        // CANTON?: number=0;
        OTRAS_ACTIVIDADES?: string="";
        BENEFICIO2?: string="";
        MAIL?: string="";
        ID_INSTITUCION?: string="";
        PRESCOLAR?: string="";
        FEC_INGPRESCOLAR?: string="";
        FEC_SALPRESCOLAR?: string="";
        ID_CLIENTE?: string="";
        FECHA_DIGITACION?: string="";
        ID_EMPRESA?: number=0;
        TIPO_DOCUMENTO?: string="";
        OBSERVACION?: string="";
        CODIGO_IESS?: number;
       
        DISCAPACIDAD?: string="";
        CUIDAD?: string="";
        DISCAPACIDAD1?: boolean;
        PORC_DISCAPACIDAD?: string="";
        COND_DISCAPACIDAD?: string="";
        TIPO_DOC_DISCAPACIDAD?: string="";
        ID_DISCAPACIDAD?: string="";
        NIVELESTUDIO?: string="";
        NOMBRECONYUGE?: string="";
        FECHAMATRICIVIL?: string="";
        FECHAMATRIECLE?: string="";
        TELEFONOCONYUGE?: string="";
        EMAILPERSONAL?: string="";
        CONTACTOEMERGENCIA?: string="";
        PARENTESCOEMERGENCIA?: string="";
        OTROPARENTEMERGENCIA?: string="";
        TELEFONOEMERGENCIA?: string="";
        SEGUROPARTICULAR?: string="";
        DISCAP_AUDITIVA?: string="";
        DISCAP_VISUAL?: string="";
        DISCAP_FISICA?: string="";
        DISCAP_INTELECTUAL?: string="";
        FECHAACTUALIZA?: string="";
        USRACTUALIZA?: string="";
        DIRECCION_CSV?: string="";
        REFERENCIADOMICILIO?: string="";
        CONTACTOEMERGENCIA2?: string="";
        PARENTESCOEMERGENCIA2?: string="";
        OTROPARENTEMERGENCIA2?: string="";
        TELEFONOEMERGENCIA2?: string="";
        ACTUALIZAWEB?: string="";
        UNIFICADO?: string="";
        CODCCOSTO_MINIS?: string="";
        CODJEFA?: string="";
        LIC_SINSUELDO?: string="";
        FEC_SINSUELDOINI?: string="";
        FEC_SINSUELDOFIN?: string="";
        MOTIVO_SALIDA?: string="";
        FEC_AIESS?: string="";
        FEC_INI_JUBILACION?: string="";
        SUELDO_JUBILADO?: string="";
        LIC_SINSUELDO_EMPR?: string="";
        FEC_SINSUELDOEMPR_INI?: string="";
        FEC_SINSUELDOEMPR_FIN?: string="";
        DIAS_PAG_SINSUELDOEMPR?: number=0;
        PRIMER_NOMBRE?: string="";
        SEGUNDO_NOMBRE?: string="";
        CODIGO_IESS_JUB?: number=0;
        NACIONALIDAD?: string="";
        ANTIGUEDAD?: number=0;
        PERTENECE_OBRA?: string="";
        FamiliarCargas?: FamiliarCargas[]=[];
        FamiliarEnfermedad?:FamiliarEnfermedad[]=[];
        FamiliarDiscapicidad?:FamiliarDiscapicidad[]=[];
        Cargos?:Cargos[]=[];
        CentroCosto?:Centros[]=[];
        Departamentos?:Departamentos[]=[];
        CuentasBancos?:CuentasBancos[]=[];
        CuentasContables?:CuentasContables[]=[];
        Titulos?:Titulos[]=[];
        Sueldos?:Suekdos[]=[];

    
}
export class FamiliarDiscapicidad {
        IDFAMILIA?: number=0;
        NOMBRECOMPLETO?: string="";
        PARENTESCO?: string="";
        FECHANACIM?: string="";
        TIPODOC?: string="";
        NUMDOC?: string="";
        ESTADO?: string="";
        FECHA_INGRESO?: string="";
        FECHA_ACTUALIZA?: string="";
        USR_ACTUALIZA?: string="";
        ID_EMPRESA?: number=0;
        ENVIO_SRI?: string="";
     
        RESPONSABILIDAD_ECON?: string="";
        PORC_DISCAPACIDAD?: number=0;
        TIPO_DISCAPACIDAD?: string="";
    }
export class FamiliarCargas {
     
                ID_HIJO?: number=0;
              
                TIPO_CARGA?: string="";
                NOMBRE_CARGA?: string="";
                FECHA_NACIMIENTO?: string="";
                SEXO?: string="";
                ID_EMPRESA?: number=0;
                FECHA_INGRESO?: string="";
                USUARIO_INGRESO?: string="";
                OTROTIPO?: string="";
                INSTITUCION?: string="";
                FECHA_MODIFICA?: string="";
                USUARIO_MODIFICA?: string="";
                GRADOCURSO?: string="";
                OTRAINSTITUCION?: string="";
            

}
export class FamiliarEnfermedad {
        IDFAMILIA?: number=0;
       
        NOMBRECOMPLETO?: string="";
        PARENTESCO?: string="";
        ESTADO?: string="";
        FECHA_INGRESO?: string="";
        USR_INGRESO?: string="";
        FECHA_ACTUALIZA?: string="";
        USR_ACTUALIZA?: string="";
        ID_EMPRESA?: number=0;
        RESPONSABILIDAD_ECON?: string="";
        ENFERMEDAD?: string="";
    }

    export class Centros  {
        GCODCCOSTO?: string="";  
        ESTADO_GR?: string="";
        IDEMPRESA?: number=0;
    }
    export class Grupo  {
        IDCRGEMP?: number=0;
        CODSEC?: string="";
        ACTIVO?: string="";
        ID_EMPRESA?: number=0;
        CARGO_PRINCIPAL?: string="";
    }
    export class Departamentos  {
        CODCRG?: string="";
        NOMCRG?: string="";
        CODDEP?: number=0;
        NOMDEP?: string="";
        CODSEC?: string="";
        NOMSEC?: string="";
        CARGO_PRINCIPAL?: string="";
        ACTIVO?: string="";
    } 
        export class Cargos {
        IDCRGEMP:number=0;
        CODCRG?: string="";
        CODSEC?: string="";
        ACTIVO?: string="";
        CARGO_PRINCIPAL?: string="";
       
      

    }
    export class CuentasContables  {
        TIPO_CTA?: string="";
        PLA_CODCNTA?: string="";
        ACTIVO?:string="";
    }
    export class CuentasBancos  {
     
        CODBANCO?: string="";
        CTABCO?: string="";
        PORCENT?: string="";
        TIPO_CUENTA?: string="";
        ESTADO?:string="";
    }
    export class Titulos  {
       
        NIVEL?: string="";
        TITULO?: string="";
        PAIS?: string="";
        INSTITUCION?: string="";
        ESTADOESTUDIO?: string="";
        REGSENESCYT?: string="";
        NUMREGSENESCYT?: string="";
        ESTADO?: string="";
        ANIOGRADUAPREVISTA?: string="";
        NIV_EN_CURSO?: string="";
    }
    export class Suekdos  {
        
      
        
     
        CODEMP?: number=0;
        FECHA?: string="";
        TIPCONTRATO?: string="";
        CENTRO_COSTO?: string="";
        A_PAGAR?: number=0;
        SUELDO?: number=0;
        EXTRAS?: number=0;
        OTROS?: number=0;
        INGRESOS?: number=0;
        EGRESOS?: number=0;
        DIAS_ENF?: number=0;
        DIAS_MAT?: number=0;
        SINSUELDO?: number=0;
    }

 
   