import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  /* Sử dụng class-validator để handle lỗi */

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
