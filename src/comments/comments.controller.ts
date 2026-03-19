import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { AuthRequest } from 'src/interface';
import CommentsService from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать комментарий' })
  @ApiBody({ type: CreateCommentDto })
  create(@Request() req: AuthRequest, @Body() dto: CreateCommentDto) {
    return this.commentsService.create(req.user.userId, dto);
  }

  @Get('task/:taskId')
  @ApiOperation({ summary: 'Получить все комментарии задачи' })
  findByTask(@Param('taskId') taskId: string) {
    return this.commentsService.findByTask(taskId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить комментарий по ID' })
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить комментарий' })
  @ApiBody({ type: UpdateCommentDto })
  update(
    @Request() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить комментарий' })
  remove(@Request() req: AuthRequest, @Param('id') id: string) {
    return this.commentsService.remove(id, req.user.userId);
  }
}

export default CommentsController;
