import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDiaryDto {
  @IsNotEmpty()
  satisfy: number;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  summary: string;
}
