/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Example user - in real life, fetch from DB
  private users = [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    { id: 1, username: 'admin', passwordHash: bcrypt.hashSync('123456', 10) }
  ];

  async validateUser(username: string, password: string) {
    const user = this.users.find(u => u.username === username);
    if (!user) return null;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    return isMatch ? { id: user.id, username: user.username } : null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
