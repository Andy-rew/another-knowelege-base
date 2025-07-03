import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@applications/guards/auth.guard';
import { CreateTagDto } from '@applications/http/tags/request/create-tag.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTagResponse } from '@applications/http/tags/response/create-tag.response';
import { TagService } from '@domain/tag/services/tag.service';
import { TagRepository } from '@domain/tag/repositories/tag.repository';
import { TagDeleteParamsDto } from '@applications/http/tags/request/tag-delete-params.dto';

@ApiTags('tags')
@UseGuards(AuthGuard)
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagService: TagService,
    private readonly tagsRepository: TagRepository,
  ) {}

  @ApiResponse({ type: CreateTagResponse })
  @Post('/create')
  public async create(@Body() body: CreateTagDto) {
    const res = await this.tagService.create({ title: body.title });
    return new CreateTagResponse(res);
  }

  @Post('/:id/delete')
  public async delete(@Param() params: TagDeleteParamsDto) {
    const tags = await this.tagsRepository.findManyByIdsOrFail([params.id]);
    const res = await this.tagService.delete(tags[0]);
  }
}
