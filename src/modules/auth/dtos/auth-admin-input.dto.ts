import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthAdminInputDto {
  @ApiProperty({ type: String, required: true, example: 'admin' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ type: String, required: true, example: '12345678' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
