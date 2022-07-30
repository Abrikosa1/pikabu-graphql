import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PostsService } from '../services';
import { PostEntity } from '../entities';
import { CreatePostInput } from '../inputs/create-post.input';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostEntity)
  async createPost(
    @Args('createPost') createPostInput: CreatePostInput,
  ): Promise<PostEntity> {
    return this.postsService.createPost(createPostInput);
  }

  @Query(() => PostEntity)
  async getPostById(@Args('id') id: string): Promise<PostEntity> {
    return this.postsService.getPostById(id);
  }

  @Query(() => [PostEntity])
  async getPosts(): Promise<PostEntity[]> {
    return this.postsService.getPosts();
  }
}
