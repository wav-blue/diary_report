import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MyLogger } from 'src/logger/logger.service';
import { IDiaryRepository } from '../repository/DAO/diary.dao';

@Injectable()
export class DiaryDeleteService {
  constructor(
    private readonly diaryRepository: IDiaryRepository,
    private readonly dataSource: DataSource,
    private logger: MyLogger,
  ) {
    this.logger.setContext(DiaryDeleteService.name);
  }

  async deleteDiary(diaryId: number, userId: string): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const diary = await this.diaryRepository.findDiary(diaryId, queryRunner);
      if (!diary) {
        throw new NotFoundException('해당하는 데이터가 존재하지 않습니다!');
      }
      if (diary.userId !== userId) {
        throw new ForbiddenException('삭제 권한이 없습니다!');
      }
      await this.diaryRepository.deleteDiary(diaryId, queryRunner);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
    return 'success';
  }
}
