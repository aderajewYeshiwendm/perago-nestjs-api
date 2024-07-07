import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Controller('photo')
export class PhotoController {
    constructor(private photoService: PhotoService) { }
    @UseGuards(JwtAuthGuard)
    @Post()
    createPhoto(@Body() createPhotoDto: CreatePhotoDto, @Request() req) {
        const userId = req.user.id;
        
        return this.photoService.createPhoto(userId, createPhotoDto);
    }
}
