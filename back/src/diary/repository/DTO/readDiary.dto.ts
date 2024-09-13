import { IsNotEmpty } from 'class-validator';

export class ReadDiaryDto {
  @IsNotEmpty()
  diaryId: number;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  satisfy: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  summary = 'fail';

  status: number;

  createdAt: Date;

  updatedAt: Date;
}
