import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/jwt-payload';
import { User } from 'src/types/user';
import { AuthAdminInputDto } from './dtos/auth-admin-input.dto';
import { AuthAdminOutputDto } from './dtos/auth-admin-ouput.dto';

@Injectable()
export class AuthService {
  private readonly username: string;
  private readonly password: string;

  constructor(private readonly jwtService: JwtService) {
    this.username = process.env.ADMIN_USERNAME as string;
    this.password = process.env.ADMIN_PASSWORD as string;
  }

  async generateAccessToken(username: string): Promise<string> {
    return await this.jwtService.signAsync({ username });
  }

  async verifyAccessToken(accessToken: string): Promise<JwtPayload> {
    return await this.jwtService.verifyAsync<JwtPayload>(accessToken);
  }

  public find(username: string): User | null {
    return this.username === username ? { username } : null;
  }

  public async login(dto: AuthAdminInputDto): Promise<AuthAdminOutputDto> {
    const isValid = this.validateUser(dto.username, dto.password);

    if (!isValid) throw new BadRequestException('Invalid username or password');

    const accessToken = await this.generateAccessToken(this.username);

    return { accessToken };
  }

  public validateUser(username: string, password: string): boolean {
    return username === this.username && password === this.password;
  }
}
