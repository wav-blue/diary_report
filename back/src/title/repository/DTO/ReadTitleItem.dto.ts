import { IsNotEmpty } from 'class-validator';
import { Title } from '../entity/title.entity';

export class ReadTitleItemDto {
  constructor(title: Title) {
    this.titleId = title.titleId;
    this.titleName = title.titleName;
    this.titleDescription = title.titleDescription;
    this.createdAt = title.createdAt;
    this.titleType = title.titleType;
  }

  @IsNotEmpty()
  titleId: number;

  @IsNotEmpty()
  titleName: string;

  @IsNotEmpty()
  titleDescription: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  titleType: number;
}
