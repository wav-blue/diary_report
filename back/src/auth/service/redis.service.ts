import { Injectable } from '@nestjs/common';
import { RedisRepository } from '../repository/dao/redis.repository';

@Injectable()
export class RedisService {
  constructor(private readonly redisRepository: RedisRepository) {}

  async getValueFromRedis(key: string): Promise<string> {
    return this.redisRepository.get(key);
  }

  async setValueToRedis(key: string, value: string) {
    return this.redisRepository.set(key, value);
  }
}
