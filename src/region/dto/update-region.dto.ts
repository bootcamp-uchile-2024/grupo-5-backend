import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRegionDto } from './create-region.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateRegionDto {
    
      @ApiProperty({
        title: 'Orden región',
        description: 'Orden de la región',
        example: 7,
      })
      @IsInt({
        message: 'El Orden región debe ser un entero',
      })
      orden: number;
    
      @ApiProperty({
        title: 'Nombre región',
        description: 'Nombre de la región',
        example: 'Región de Valparaíso',
      })
      @IsString({
        message: 'El nombre región debe ser una cadena de texto',
      })
      nombreRegion: string;
    }
    