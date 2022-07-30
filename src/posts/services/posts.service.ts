import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from '../inputs/create-post.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  async createPost(postInput: CreatePostInput): Promise<PostEntity> {
    return await this.postsRepository.save({ ...postInput });
  }

  async getPostById(id: string): Promise<PostEntity> {
    return await this.postsRepository.findOneBy({ id });
  }

  async getPosts(): Promise<PostEntity[]> {
    return await this.postsRepository.find();
  }

  async deletePost(id: string): Promise<string> {
    await this.postsRepository.delete(id);
    return id;
  }
}
