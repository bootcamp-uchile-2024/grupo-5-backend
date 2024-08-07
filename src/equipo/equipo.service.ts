import { Injectable } from '@nestjs/common';
import { EquipoDto, AreaDto, EcommerceDto } from './dto/create-equipo.dto';

@Injectable()
export class EquipoService {
  private readonly equipo: EquipoDto = {
    nombre: 'Pet-tacular',
    areas: [
      {
        nombre: 'Diseño UX UI',
        lider: { nombre: 'Carolina Herrera', rol: 'Líder de Diseño UX UI' },
        integrantes: [
          { nombre: 'María Yañez', rol: 'Diseñadora UX UI' },
          { nombre: 'Luis Gonzales', rol: 'Diseñador UX UI' },
          { nombre: 'Nelson Cáceres', rol: 'Diseñador UX UI' },
          { nombre: 'Valeria Jara', rol: 'Diseñadora UX UI' },
        ],
      },
      {
        nombre: 'Desarrollo Frontend',
        lider: { nombre: 'Leonardo Arias', rol: 'Líder de Desarrollo Frontend' },
        integrantes: [
          { nombre: 'Claudia Moragrega', rol: 'Desarrolladora Frontend' },
        ],
      },
      {
        nombre: 'Desarrollo Backend',
        lider: { nombre: 'Rodrigo Alcayaga', rol: 'Líder de Desarrollo Backend' },
        integrantes: [
          { nombre: 'Andree Baradit', rol: 'Desarrollador Backend' },
          { nombre: 'Anyelo Flores', rol: 'Desarrollador Backend' },
          { nombre: 'Lorenzo Baeza', rol: 'Desarrollador Backend' },
          { nombre: 'Mauricio Piña', rol: 'Desarrollador Backend' },
        ],
      },
    ],
  };

  private readonly ecommerce: EcommerceDto = {
    nombre: 'Pétropolis',
    descripcion: 'Compra de productos especializados para mascotas con una experiencia personalizada.',
    tipo: 'Aplicación Web de E-commerce B2C (Business to Consumer)',
    objetivoGeneral: 'Ofrecer productos para mascotas con una experiencia de compra personalizada y adaptada a las necesidades de cada cliente.',
    objetivosEspecificos: [
      'Proporcionar una amplia gama de productos para mascotas de alta calidad.',
      'Brindar una experiencia de compra personalizada basada en las preferencias del cliente.',
      'Garantizar un proceso de compra fácil y rápido.',
      'Ofrecer soporte y asesoramiento especializado para el cuidado de mascotas.',
    ],
  };

  obtenerEquipo(): EquipoDto {
    return this.equipo;
  }

  obtenerAreaPorNombre(nombre: string): { area?: AreaDto; mensaje?: string } {
    const area = this.equipo.areas.find(
      area => area.nombre.toLowerCase() === nombre.toLowerCase()
    );
    return area ? { area } : { mensaje: 'Área no encontrada' };
  }

  obtenerTodasLasAreas(): AreaDto[] {
    return this.equipo.areas;
  }

  obtenerDatosEcommerce(): EcommerceDto {
    return this.ecommerce;
  }
}
