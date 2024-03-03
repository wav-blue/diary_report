import { IsNotEmpty } from 'class-validator';

export class CreateTitleDto {
  @IsNotEmpty()
  titleCode: string;
}
