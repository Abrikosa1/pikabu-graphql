import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities';
import { PostsService } from './services';
import { PostsResolver } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
