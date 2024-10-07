import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MyLogger } from 'src/logger/logger.service';

@Injectable()
export class RedisRepository {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private logger: MyLogger,
  ) {
    this.logger.setContext(RedisRepository.name);
  }

  async get(key: string) {
    try {
      const value = await this.cacheManager.get(key);
      return value;
    } catch (err) {
      this.logger.error('NOT FOUND / ERROR INCURRED');
      this.logger.error('==================================');
      this.logger.error('INFO');
      this.logger.error(`target key: ${key}`);
      this.logger.error('==================================');
    }
  }

  async set(key: string, value: string) {
    try {
      await this.cacheManager.set(key, value);
    } catch (error) {
      this.logger.error('ERROR INCURRED');
      this.logger.error('==================================');
      this.logger.error('INFO');
      this.logger.error(`key: ${key}`);
      this.logger.error(`value: ${value}`);
      this.logger.error('==================================');
    }
  }
}
