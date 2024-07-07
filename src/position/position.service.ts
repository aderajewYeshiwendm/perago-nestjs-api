import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from '../entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async createPosition(dto: CreatePositionDto): Promise<Position> {
    const position = this.positionRepository.create(dto);
    return this.positionRepository.save(position);
  }

  async findAllPositions(): Promise<Position[]> {
    return this.positionRepository.find();
  }

  async findPositionDetail(id: string): Promise<Position | null> {
    return this.positionRepository.findOneBy({id});
  }


async findPositionChildren(parId: string): Promise<Position | null> {
  const parent = await this.positionRepository.findOne({ where: { id: parId } });

  if (!parent) {
      return null;
  }

  const children = await this.positionRepository.find({ where: { parentId: parId } });
  const childrenWithDescendants = await Promise.all(children.map(async (child) => {
      const descendants = await this.findPositionChildren(child.id);
      return {
          ...child,
          children: descendants ? descendants.children : [],
      };
  }));

  return {
      ...parent,
      children: childrenWithDescendants,
  };
}


  async updatePositionDetail(parId: string, id: string, data: UpdatePositionDto): Promise<Position | string> {
    const position = await this.positionRepository.findOneBy({id});
    if (!position) {
      throw new ForbiddenException('Position not found');
    }

    if (position.parentId !== parId) {
      return 'not allowed to update position of an employee';
    } else {
      await this.positionRepository.update(id, data);
      return this.positionRepository.findOneBy({id});
    }
  }

  async removePosition( parId: string,id: string): Promise<void | string> {
    const position = await this.positionRepository.findOneBy({id});
    if (!position) {
      throw new ForbiddenException('Position not found');
    }

    if (position.parentId !== parId) {
      return 'not allowed to delete position of an employee';
    } else {
      await this.positionRepository.delete(id);
    }
  }
}
