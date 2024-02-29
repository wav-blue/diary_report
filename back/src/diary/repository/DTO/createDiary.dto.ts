import { IsNotEmpty } from 'class-validator';

export class CreateDiaryDto {
  @IsNotEmpty()
  satisfy: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  summary = '서기관 두두가 열심히 요약 중입니다!';
}
