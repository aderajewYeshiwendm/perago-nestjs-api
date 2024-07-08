import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly jwt: JwtService
  ) {}

  async register(dto: AuthDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new User();
    user.email = dto.email;
    user.password = hashedPassword;

    try {
      await this.entityManager.save(User, user);
      return this.Token(user.id, user.email);
    } catch (error) {
      if (error.code === '23505') { // 23505 is the error code for unique violation in PostgreSQL
        throw new ForbiddenException('Credentials taken by other users');
      }
      throw error;
    }
  }

  async Token(userId: string, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: 'root',
    });

    return { access_token: token };
  }

  async login(dto: AuthDto) {
    const user = await this.entityManager.findOne(User,{
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect please register');
    }

    const pwMatches = await bcrypt.compare(dto.password, user.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.Token(user.id, user.email);
  }
}
