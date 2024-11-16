import { Module } from '@nestjs/common';
import { CarrocomprasService } from './carrocompras.service';
import { CarrocomprasController } from './carrocompras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroCompras } from './entities/carroCompra.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarroCompras
    ]),
  ],
  controllers: [CarrocomprasController],
  providers: [CarrocomprasService],
})
export class CarrocomprasModule {}
