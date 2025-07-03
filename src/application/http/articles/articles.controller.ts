import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from '@domain/article/services/article.service';
import { CreateArticleDto } from '@applications/http/articles/request/create-article.dto';
import { AuthGuard } from '@applications/guards/auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import { CreateArticleResponse } from '@applications/http/articles/response/create-article.response';
import { EditArticleDto } from '@applications/http/articles/request/edit-article.dto';
import { EditArticleParamsDto } from '@applications/http/articles/request/edit-article-params.dto';
import { ArticleRepository } from '@domain/article/repositories/article.repository';
import { DeleteArticleParamsDto } from '@applications/http/articles/request/delete-article-params.dto';
import { EditArticleTagsDto } from '@applications/http/articles/request/edit-article-tags.dto';
import { EditArticleTagsParamsDto } from '@applications/http/articles/request/edit-article-tags-params.dto';
import { TagRepository } from '@domain/tag/repositories/tag.repository';
import { GetAllArticlesQueryDto } from '@applications/http/articles/request/get-all-articles-query.dto';
import { GetAllArticlesResponse } from '@applications/http/articles/response/get-all-articles.response';
import { GetAllArticlesNonAuthResponse } from '@applications/http/articles/response/get-all-articles-non-auth.response';
import { GetAllArticlesNonAuthQueryDto } from '@applications/http/articles/request/get-all-articles-non-auth-query.dto';
import { ArticleTypeEnum } from '@domain/article/types/article-type.enum';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  @ApiResponse({ type: CreateArticleResponse })
  @UseGuards(AuthGuard)
  @Post('/create')
  async create(@Body() body: CreateArticleDto) {
    const res = await this.articleService.create({
      title: body.title,
      type: body.type,
      summary: body.summary,
    });

    return new CreateArticleResponse(res);
  }

  @UseGuards(AuthGuard)
  @Put('/:id/edit')
  async edit(
    @Body() body: EditArticleDto,
    @Param() param: EditArticleParamsDto,
  ) {
    const article = await this.articleRepository.findOneOrFail(param.id);
    await this.articleService.edit({
      article: article,
      type: body.type,
      summary: body.summary,
      title: body.title,
    });
  }

  @UseGuards(AuthGuard)
  @Put('/:id/edit/tags')
  async editTags(
    @Body() body: EditArticleTagsDto,
    @Param() param: EditArticleTagsParamsDto,
  ) {
    const article = await this.articleRepository.findOneOrFail(param.id);
    const tags = await this.tagRepository.findManyByIdsOrFail(body.tagIds);
    await this.articleService.editTags({ tags: tags, article: article });
  }

  @UseGuards(AuthGuard)
  @Put('/:id/delete')
  async delete(@Param() param: DeleteArticleParamsDto) {
    const article = await this.articleRepository.findOneOrFail(param.id);
    await this.articleService.deleteArticle(article);
  }

  @ApiResponse({ type: GetAllArticlesResponse })
  @UseGuards(AuthGuard)
  @Get('/all')
  async getAll(@Query() query: GetAllArticlesQueryDto) {
    // требуется уточнение сколько может быть тэгов в рамках одной статьи
    // если неограниченное количество или достаточно много, то необходимо сделать пагинацию и по ним
    const [articles, count] = await this.articleRepository.findAllWithFilters({
      limit: query.limit,
      offset: query.offset,
      type: query.type,
      tagIds: query.tagIds,
    });

    return new GetAllArticlesResponse(articles, count);
  }

  @ApiResponse({ type: GetAllArticlesNonAuthResponse })
  @Get('/all/non-auth')
  async getAllNonAuth(@Query() query: GetAllArticlesNonAuthQueryDto) {
    // требуется уточнение сколько может быть тэгов в рамках одной статьи
    // если неограниченное количество или достаточно много, то необходимо сделать пагинацию и по ним
    const [articles, count] = await this.articleRepository.findAllWithFilters({
      limit: query.limit,
      offset: query.offset,
      type: ArticleTypeEnum.public,
      tagIds: query.tagIds,
    });

    return new GetAllArticlesNonAuthResponse(articles, count);
  }
}
