import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(userId: string, dto: CreateCommentDto) {
    return this.commentModel.create({ ...dto, userId });
  }

  async findByTask(taskId: string) {
    return this.commentModel.find({ taskId }).sort({ createdAt: 1 });
  }

  async findOne(id: string) {
    const comment = await this.commentModel.findById(id);
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(id: string, dto: UpdateCommentDto, userId: string) {
    const comment = await this.commentModel.findOneAndUpdate(
      { _id: id, userId },
      dto,
      { new: true },
    );

    if (!comment)
      throw new NotFoundException('Comment not found or not authorized');

    return comment;
  }

  async remove(id: string, userId: string) {
    const comment = await this.commentModel.findOneAndDelete({
      _id: id,
      userId,
    });
    if (!comment)
      throw new NotFoundException('Comment not found or not authorized');
    return { message: 'Comment deleted' };
  }
}

export default CommentsService;
