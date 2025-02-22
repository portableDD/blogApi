import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';
import { CreateManyUsersDto } from '../dtos/create-many-user.dto';

@Injectable()
export class CreateMany {
  constructor(
    // inject data soucre
    private readonly dataSource: DataSource,
  ) {}
  public async manyUsers(createManyUsersDto: CreateManyUsersDto) {
    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();
    // Connect QueryRunner to data source
    await queryRunner.connect();
    // Start transaction
    await queryRunner.startTransaction();
    // If successful commit
    const newUsers: User[] = [];
    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // when successful
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      // If unsuccessful roll back
      await queryRunner.rollbackTransaction();
    } finally {
      // Release Connection
      await queryRunner.release();
    }
    return newUsers;
  }
}
