import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerInputDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image?: Express.Multer.File;
}
