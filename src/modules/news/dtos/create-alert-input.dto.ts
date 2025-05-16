import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlertInputDto {
  @ApiProperty({ type: String, required: true, example: 'Promotion!!!' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'We have a promotion going on',
  })
  @IsString()
  @IsNotEmpty()
  body: string;
}
