import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { Photo } from '../entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Photo])],
  providers: [PhotoService],
  controllers:[PhotoController]
})
export class PhotoModule {}
