import { Module } from '@nestjs/common';
import { Pagination } from './provider/pagination';

@Module({
  providers: [Pagination],
  exports: [Pagination],
})
export class PaginationModule {}
