import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterDeviceInputDto {
  @ApiProperty({ type: String, required: true, example: '1.0.0' })
  @IsString()
  @IsNotEmpty()
  app_version: string;

  @ApiProperty({ type: String, required: true, example: '12345678' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ type: String, required: true, example: 'uz' })
  @IsString()
  @IsNotEmpty()
  locate: string;

  @ApiProperty({ type: Number, required: true, example: 5 })
  @IsNumber()
  @IsNotEmpty()
  timezone: number;

  @ApiProperty({ type: Number, required: true, example: 1 })
  @IsNumber()
  @IsNotEmpty()
  os: number; // 1 = IOS, 2 = ANDROID
}
