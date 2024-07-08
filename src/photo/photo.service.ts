import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Photo } from '../entities/photo.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotoService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) { }
    
    async createPhoto(userId:string,dto: CreatePhotoDto,): Promise<Photo> {
        const photo = this.entityManager.create(Photo,{
            
            userId,
            ...dto,
        })
      
            return this.entityManager.save(Photo,photo);
    
    }
}
