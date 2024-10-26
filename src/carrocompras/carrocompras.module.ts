import { Module } from '@nestjs/common';
import { CarrocomprasService } from './carrocompras.service';
import { CarrocomprasController } from './carrocompras.controller';

@Module({
  controllers: [CarrocomprasController],
  providers: [CarrocomprasService],
})
export class CarrocomprasModule {}
