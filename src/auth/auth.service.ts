import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../users/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existsUser = await this.usersRepository.exists({
      where: [{ login: createUserDto.login }, { email: createUserDto.email }],
    });
    if (existsUser) {
      throw new ConflictException(
        'Login or email already exists. Please try with another one',
      );
    }
    const hashedPassword = await bcrypt.hash(
      this.configService.get<string>('ENCRYPT_KEY') + createUserDto.password,
      10,
    );
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      select: {
        id: true,
        login: true,
        role: true,
        password: true,
        fullname: true,
        email: true,
        phone: true,
      },
      where: {
        login: loginDto.login,
      },
    });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        this.configService.get<string>('ENCRYPT_KEY') + loginDto.password,
        user.password,
      );
      if (isPasswordMatch) {
        const payload = {
          ...user,
          password: undefined,
        };

        return {
          access_token: this.jwtService.sign(
            { ...payload, token_type: 'ACCESS' },
            {
              expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}m`,
            },
          ),
          refresh_token: this.jwtService.sign(
            { ...payload, token_type: 'REFRESH' },
            {
              expiresIn: `${this.configService.get('JWT_REFRESH_EXPIRATION_TIME')}m`,
            },
          ),
        };
      }
    }

    throw new UnauthorizedException(`Login or password is invalid`);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const payload = this.verifyToken(refreshTokenDto.refresh_token, 'REFRESH');

    const user = await this.usersRepository.findOne({
      select: {
        id: true,
        login: true,
        role: true,
        fullname: true,
        email: true,
        phone: true,
      },
      where: {
        login: refreshTokenDto.login,
      },
    });
    if (user) {
      const payload = {
        ...user,
        token_type: 'ACCESS'
      };

      return {
        access_token: this.jwtService.sign(payload, {
          expiresIn: `${this.configService.get('JWT_EXPIRATION_TIME')}m`,
        }),
      };
    }

    throw new UnauthorizedException(`Login or password is invalid`);
  }

  verifyToken(token: string, tokenType: string): any {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      if (payload.token_type != tokenType) {
        throw new UnauthorizedException('Invalid token type');
      }
      return payload;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Expired token');
      } else if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      } else {
        throw new UnauthorizedException('Token validation error');
      }
    }
  }
}