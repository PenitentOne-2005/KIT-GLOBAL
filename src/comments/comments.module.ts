import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import CommentsService from './comments.service';
import CommentsController from './comments.controller';
import { Comment, CommentSchema } from './comment.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    AuthModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
