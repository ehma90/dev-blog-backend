import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto, authorId: string): Promise<Post> {
    const post = new this.postModel({
      ...createPostDto,
      authorId,
    });
    return post.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().populate('authorId', 'username').exec();
  }

  async findOne(id: string): Promise<Post | null> {
    return this.postModel.findById(id).populate('authorId', 'username').exec();
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    authorId: string,
  ): Promise<Post | null> {
    const post = await this.postModel.findOne({ _id: id, authorId });
    if (!post) {
      return null;
    }

    Object.assign(post, updatePostDto);
    return post.save();
  }

  async remove(id: string, authorId: string): Promise<boolean> {
    const result = await this.postModel.deleteOne({ _id: id, authorId });
    return result.deletedCount > 0;
  }

  async findByAuthor(authorId: string): Promise<Post[]> {
    return this.postModel
      .find({ authorId })
      .populate('authorId', 'username')
      .exec();
  }
}
