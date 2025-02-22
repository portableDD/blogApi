import { Injectable, Inject } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginatedInterfaces';

@Injectable()
export class Pagination {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  public async paginatedQuery<T extends ObjectLiteral>(
    paginatedQueryDto: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const result = await repository.find({
      skip: (paginatedQueryDto.page - 1) * paginatedQueryDto.limit,
      // take: number of post to show per page
      take: paginatedQueryDto.limit,
    });

    // creat a request url from Request
    const baseUrl =
      this.request.protocol + '://' + this.request.headers.host + '/';

    const newUrl = new URL(this.request.url, baseUrl);
    console.log(baseUrl, newUrl);

    const totalItem = await repository.count();
    const totalPage = Math.ceil(totalItem / paginatedQueryDto.limit);
    const nextPage =
      paginatedQueryDto.page === totalPage
        ? paginatedQueryDto.page
        : paginatedQueryDto.page + 1;

    const previousPage =
      paginatedQueryDto.page === 1
        ? paginatedQueryDto.page
        : paginatedQueryDto.page - 1;

    const finalResult: Paginated<T> = {
      data: result,
      meta: {
        itemsPerPage: paginatedQueryDto.limit,
        totalItems: totalItem,
        currentPage: paginatedQueryDto.page,
        totalPage: totalPage,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${totalPage}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${paginatedQueryDto.page}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${previousPage}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginatedQueryDto.limit}&page=${nextPage}`,
      },
    };

    return finalResult;
  }
}
