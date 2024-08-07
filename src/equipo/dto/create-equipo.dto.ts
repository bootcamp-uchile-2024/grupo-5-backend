export class CreateEquipoDto {
    
  }
  
  export class IntegranteDto {
    nombre: string;
    rol: string;
  }
  
  export class LiderDto {
    nombre: string;
    rol: string;
  }
  
  export class AreaDto {
    nombre: string;
    lider: LiderDto;
    integrantes: IntegranteDto[];
  }
  
  export class EcommerceDto {
    nombre: string;
    descripcion: string;
    tipo: string;
    objetivoGeneral: string;
    objetivosEspecificos: string[];
  }
  
  export class EquipoDto {
    nombre: string;
    areas: AreaDto[];
  }
  