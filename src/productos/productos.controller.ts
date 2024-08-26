import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

@ApiResponse({ status: 200, description: 'Obtiene el producto' })
@ApiResponse({ status: 404, description: 'El producto no existe.' })
    @Get('nombre')
    obtenerNombreModulo(): string {
      return 'Productos';
    }
}
