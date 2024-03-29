import { IsNotEmpty } from 'class-validator';
import { Title } from '../entity/title.entity';

export class ReadTitleDto {
  constructor(title: Title) {
    this.titleId = title.titleId;
    this.titleName = title.titleName;
    this.titleDescription = title.titleDescription;
    this.titlePrice = title.titlePrice;
    this.createdAt = title.createdAt;
  }

  @IsNotEmpty()
  titleId: number;

  @IsNotEmpty()
  titlePrice: number;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  titleName: string;

  @IsNotEmpty()
  titleDescription: string;
}
