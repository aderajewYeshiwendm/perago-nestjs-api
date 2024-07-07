import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Photo } from './photo.entity';
import { Position } from './position.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Photo, (photo) => photo.user)
  @JoinColumn()
  photo?: Photo;

  @OneToOne(() => Position, (position) => position.user)
  @JoinColumn()
  position?: Position;
}
