import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUpdateAlertInputDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'An update has been released',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String, required: true, example: 'Download' })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    type: [String],
    required: true,
    example: ['https://example.com', 'https://example.com'],
  })
  @IsString({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsArray()
  @IsNotEmpty()
  url: string[];
}
