import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from '@domain/user/services/user.service';
import { UsersCreateDto } from '@applications/http/users/request/users-create.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersCreateResponse } from '@applications/http/users/response/users-create.response';
import { UsersEditDto } from '@applications/http/users/request/users-edit.dto';
import { UserRepository } from '@domain/user/repository/user.repository';
import { UsersAllDto } from '@applications/http/users/request/users-all.dto';
import { UsersAllResponse } from '@applications/http/users/response/users-all.response';
import { UsersEditParamsDto } from '@applications/http/users/request/users-edit-params.dto';
import { UsersDeleteParamsDto } from '@applications/http/users/request/users-delete-params.dto';
import { Auth } from '@applications/decorators/auth.decorator';

@ApiTags('users')
@Auth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  @ApiResponse({ type: UsersCreateResponse })
  @Post('/create')
  async create(@Body() body: UsersCreateDto) {
    const res = await this.usersService.createUser({
      name: body.name,
      email: body.email,
      password: body.password,
      samePassword: body.samePassword,
    });
    return new UsersCreateResponse(res);
  }

  @Put('/:id/edit')
  async edit(@Param() params: UsersEditParamsDto, @Body() body: UsersEditDto) {
    const user = await this.userRepository.findByIdOrFail(params.id);
    await this.usersService.editUser({
      user: user,
      newParams: { email: body.email, name: body.name },
    });
  }

  @Delete('/:id/delete')
  async delete(@Param() params: UsersDeleteParamsDto) {
    const user = await this.userRepository.findByIdOrFail(params.id);
    await this.usersService.deleteUser(user);
  }

  @ApiResponse({ type: UsersAllResponse })
  @Get('/all')
  async getAll(@Query() query: UsersAllDto) {
    const [users, count] = await this.userRepository.findAllPaginated({
      limit: query.limit,
      offset: query.offset,
    });
    return new UsersAllResponse(users, count);
  }
}
