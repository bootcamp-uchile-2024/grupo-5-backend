import { Injectable } from '@nestjs/common';
import { MascotaDto } from './dto/read-mascota.dto';
import { ActualizarMascotaDto } from './dto/update-mascota.dto';

@Injectable()
export class MascotasService {
  create(createMascotaDto: MascotaDto) {
    return 'This action adds a new mascota';
  }

  findAll() {
    return `This action returns all mascotas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mascota`;
  }

  update(id: number, actualizarMascotaDto: ActualizarMascotaDto) {
    return `This action updates a #${id} mascota`;
  }

  remove(id: number) {
    return `This action removes a #${id} mascota`;
  }
}
