import { IsNotEmpty } from 'class-validator';
import { Title } from '../entity/title.entity';

export class ReadTitleItemDto {
  constructor(title: Title) {
    this.titleId = title.titleId;
    this.titleName = title.titleName;
    this.titleDescription = title.titleDescription;
    this.createdAt = title.createdAt;
  }

  @IsNotEmpty()
  titleId: number;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  titleName: string;

  @IsNotEmpty()
  titleDescription: string;
}
