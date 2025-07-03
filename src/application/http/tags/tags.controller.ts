import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@applications/guards/auth.guard';
import { CreateTagDto } from '@applications/http/tags/request/create-tag.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagResponse } from '@applications/http/tags/response/create-tag.response';
import { TagService } from '@domain/tag/services/tag.service';
import { TagRepository } from '@domain/tag/repositories/tag.repository';
import { TagDeleteParamsDto } from '@applications/http/tags/request/tag-delete-params.dto';
import { GetAllTagsResponse } from '@applications/http/tags/response/get-all-tags.response';
import { GetAllTagsDto } from '@applications/http/tags/request/get-all-tags.dto';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagService: TagService,
    private readonly tagsRepository: TagRepository,
  ) {}

  @UseGuards(AuthGuard)
  @ApiResponse({ type: CreateTagResponse })
  @Post('/create')
  public async create(@Body() body: CreateTagDto) {
    const res = await this.tagService.create({ title: body.title });
    return new CreateTagResponse(res);
  }

  @UseGuards(AuthGuard)
  @Post('/:id/delete')
  public async delete(@Param() params: TagDeleteParamsDto) {
    const tags = await this.tagsRepository.findManyByIdsOrFail([params.id]);
    await this.tagService.delete(tags[0]);
  }

  @ApiResponse({ type: GetAllTagsResponse })
  @Get('/all')
  public async getAll(@Query() query: GetAllTagsDto) {
    const [tags, count] = await this.tagsRepository.findAllPaginated({
      limit: query.limit,
      offset: query.offset,
    });
    return new GetAllTagsResponse(tags, count);
  }
}
