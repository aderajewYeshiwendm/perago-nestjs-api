import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  parentId: string;

  @Column({ unique: true, nullable: true })
  userId: string;

  @OneToOne(() => User, (user) => user.position)
  @JoinColumn()
  user?: User;
  @OneToMany(() => Position, (position) => position.parent)
  children: Position[];

  @ManyToOne(() => Position, (position) => position.children)
  @JoinColumn({ name: 'parentId' })
  parent: Position;
}
