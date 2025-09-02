import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from '../common/interfaces/auth-user.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body(ValidationPipe) createPostDto: CreatePostDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.postsService.create(createPostDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('my-posts')
  @UseGuards(JwtAuthGuard)
  findMyPosts(@Request() req: AuthenticatedRequest) {
    return this.postsService.findByAuthor(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePostDto: UpdatePostDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const post = await this.postsService.update(
      id,
      updatePostDto,
      req.user.userId,
    );
    if (!post) {
      throw new NotFoundException(
        'Post not found or you are not authorized to update it',
      );
    }
    return post;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const deleted = await this.postsService.remove(id, req.user.userId);
    if (!deleted) {
      throw new NotFoundException(
        'Post not found or you are not authorized to delete it',
      );
    }
    return { message: 'Post deleted successfully' };
  }
}
