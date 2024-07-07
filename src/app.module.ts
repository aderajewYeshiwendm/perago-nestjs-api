import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { User } from './entities/user.entity';
import { Position } from './entities/position.entity';
import { AuthModule } from './auth/auth.module';
import { PositionModule } from './position/position.module';
import { PhotoModule } from './photo/photo.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'pass3414',
      database: 'orga_structure',
      entities: [Photo,User,Position],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Photo, User, Position]),
    AuthModule,
    PositionModule,
    PhotoModule,
  
  ],
})
export class AppModule {}
