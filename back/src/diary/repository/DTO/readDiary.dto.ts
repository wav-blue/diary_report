import { IsNotEmpty } from 'class-validator';

export class ReadDiaryDto {
  @IsNotEmpty()
  diaryId: number;

  userId: string;

  @IsNotEmpty()
  satisfy: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  summary = 'fail';

  createdAt: Date;

  updatedAt: Date;
}
