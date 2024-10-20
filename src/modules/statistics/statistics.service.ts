import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { StatisticsRepository } from './statistics.repository';
@Injectable()
export class StatisticsService {
  constructor(private readonly statisticsRepository: StatisticsRepository) {}
  async getOrgAnalys(org_id: string) {
    return await this.statisticsRepository.getOrgAnalys(org_id)
  }
}
