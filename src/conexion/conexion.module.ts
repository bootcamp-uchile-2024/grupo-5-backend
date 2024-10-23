import { Module } from '@nestjs/common';
import { ConexionService } from './conexion.service';
import { ConexionController } from './conexion.controller';

@Module({
  controllers: [ConexionController],
  providers: [ConexionService],
})
export class ConexionModule {}
