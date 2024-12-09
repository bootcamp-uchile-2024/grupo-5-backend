import { Module } from '@nestjs/common';
import { DescuentosService } from './descuentos.service';
import { DescuentosController } from './descuentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Descuento } from './entities/descuento.entity';
import { DetalleDescuento } from './entities/detalle-descuento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Descuento,
      DetalleDescuento])
  ]
  ,
  controllers: [DescuentosController],
  providers: [DescuentosService],
})
export class DescuentosModule {}
