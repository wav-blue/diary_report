import { IsNotEmpty } from 'class-validator';

export class CreateDiaryDto {
  @IsNotEmpty()
  satisfy: number;

  @IsNotEmpty()
  content: string;
}
