import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {

  @ApiProperty({
    description: 'User login',
    example: 'user',
  })
  @IsNotEmpty({ message: 'Login cannot be an empty value' })
  @IsString({ message: 'Login must be a string' })
  login: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
  })
  @IsNotEmpty({ message: 'Password cannot be an empty value' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}