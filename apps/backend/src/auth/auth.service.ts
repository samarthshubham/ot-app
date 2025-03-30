import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateToken(user: any) {
    return this.jwtService.sign({ username: user.username, sub: user.id });
  }

  async signup(username: string, password: string) {
    const hashedPassword = await this.hashPassword(password);
    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name: 'Default Name',
        email: `${username}@example.com`,
      },
    });
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user || !(await this.validatePassword(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return { access_token: this.generateToken(user) };
  }
}
