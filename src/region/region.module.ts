import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Comuna } from 'src/comuna/entities/comuna.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comuna, 
      Region
    ]),
  ],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
