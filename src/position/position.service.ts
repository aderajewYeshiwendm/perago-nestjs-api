import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Position } from '../entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async createPosition(dto: CreatePositionDto): Promise<Position> {
    const position = this.entityManager.create(Position, dto);
    return this.entityManager.save(Position, position);
  }

  async findAllPositions(): Promise<Position[]> {
    return this.entityManager.find(Position);
  }

  async findPositionDetail(id: string): Promise<Position | null> {
    return this.entityManager.findOne(Position, { where: { id } });
  }

  async findPositionChildren(parId: string): Promise<Position | null> {
    const parent = await this.entityManager.findOne(Position, { where: { id: parId } });

    if (!parent) {
      return null;
    }

    const children = await this.entityManager.find(Position, { where: { parentId: parId } });
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
    const position = await this.entityManager.findOne(Position, { where: { id } });
    if (!position) {
      throw new ForbiddenException('Position not found');
    }

    if (position.parentId !== parId) {
      return 'not allowed to update position of an employee';
    } else {
      await this.entityManager.update(Position, id, data);
      return this.entityManager.findOne(Position, { where: { id } });
    }
  }

  async removePosition(parId: string, id: string): Promise<void | string> {
    const position = await this.entityManager.findOne(Position, { where: { id } });
    if (!position) {
      throw new ForbiddenException('Position not found');
    }

    if (position.parentId !== parId) {
      return 'You are not allowed to delete position of an employee';
    } else {
      await this.entityManager.delete(Position, id);
    }
  }
}
