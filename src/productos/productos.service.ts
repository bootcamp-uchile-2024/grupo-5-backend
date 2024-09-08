import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  create(createProductoDto: CreateProductoDto) {
    return 'This action adds a new producto';
  }


  findAll() {
    return `This action returns all productos`;
  }


  findOneDetail(id: number) {
    return `This action returns el detalle de  producto #${id} `;
  }
  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
