import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

const tableName = 'posts';

@Entity({
  name: tableName,
})
@ObjectType()
export class PostEntity {
  static tableName = tableName;

  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Field(() => String)
  @Column({ type: 'text' })
  title: string;

  @Field(() => String)
  @Column({ type: 'text' })
  description: string;

  @Field(() => [String])
  @Column({ type: 'text', array: true, default: [] })
  imageUrls?: string[];

  @Field(() => [String])
  @Column({ type: 'text', array: true, default: [] })
  tags?: string[];
}
