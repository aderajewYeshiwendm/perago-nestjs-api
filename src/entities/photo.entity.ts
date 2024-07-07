import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  filename: string;

  @Column({ unique: true })
  userId: string;

  @OneToOne(() => User, (user) => user.photo)
  @JoinColumn()
  user: User;
    
}
