import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from '../entities/photo.entity';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
    ) { }
    
    async createPhoto(userId:string,dto: CreatePhotoDto,): Promise<Photo> {
        const photo = this.photoRepository.create({
            userId,
            ...dto,
        })
      
            return this.photoRepository.save(photo);
    
    }
}
