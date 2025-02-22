import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { GetUserParamDto } from 'src/users/dtos/getUser-params.dto';
import { EditUserDto } from 'src/users/dtos/patch-user.dto';
import { UserService } from './providers/users.services';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enums';
import { CreateManyUsersDto } from './dtos/create-many-user.dto';

@Controller('users')
@ApiTags()
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @ApiResponse({
    status: 200,
    description: 'Users fetched successful based on the query',
  })
  @ApiOperation({ summary: 'this is to get all users and one user' })
  @Get('/:id?')
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Number entries return per query',
    example: '10',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Page number of entries return',
    example: '1',
  })
  @Auth(AuthType.Bearer)
  public getUsers(
    @Param() getUserParamDto: GetUserParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    // console.log(typeof getUserParamDto);
    // console.log(typeof getUserParamDto.id);
    // console.log(getUserParamDto);
    // console.log(typeof limit);
    // console.log(limit);
    // console.log(typeof page);
    // console.log(page);
    // if (getUserParamDto) {
    //   return this.userService.findOneById(getUserParamDto.id);
    // }
    return this.userService.findAll(getUserParamDto, limit, page);
  }

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  // @SetMetadata('authType', 'None')
  @Auth(AuthType.None)
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUsers(createUserDto);
  }

  @Post('many-users')
  public createManyUsers(@Body() createManyUserDto: CreateManyUsersDto) {
    return this.userService.createMany(createManyUserDto);
  }

  @Put()
  public putUsers() {
    return 'you sent a put request to the users';
  }

  @Patch()
  public editUser(@Body() editUserDto: EditUserDto) {
    console.log(editUserDto);
    return 'you sent a patch request to the users';
  }

  @Delete()
  public deleteUsers() {
    return this.userService.deleteUser();
  }
}
