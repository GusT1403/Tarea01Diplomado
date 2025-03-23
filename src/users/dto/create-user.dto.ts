
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'Login is the user nickname',
    example: 'john_doe',
  })
  @IsNotEmpty({ message: 'Login cannot be an empty value' })
  @IsString({ message: 'Login must be a string' })
  login: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsNotEmpty({ message: 'Password cannot be an empty value' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiProperty({
    description: 'Complete name',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Fullname cannot be an empty value' })
  @IsString({ message: 'Fullname must be a string' })
  fullname: string;

  @ApiProperty({
    description: 'Email',
    example: 'johndoe@gmail.com',
  })
  @IsNotEmpty({ message: 'Email cannot be an empty value' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiPropertyOptional({
    description: 'Phone number',
    example: '3333333',
  })
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'User role',
    example: '',
  })
  role: UserRoleEnum;
}