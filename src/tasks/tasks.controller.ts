import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import TasksService from './tasks.service';
import type { AuthRequest } from 'src/interface';
import CommentsService from '../comments/comments.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
class TasksController {
  constructor(
    private tasksService: TasksService,
    private commentsService: CommentsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую задачу' })
  @ApiBody({ type: CreateTaskDto })
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Список задач с фильтром и сортировкой' })
  findAll(@Query() filter: FilterTaskDto) {
    return this.tasksService.findAll(filter);
  }

  @Get('search')
  @ApiOperation({ summary: 'Поиск задач по ключевым словам' })
  @ApiQuery({ name: 'q', description: 'Ключевые слова для поиска' })
  search(@Query('q') q: string) {
    return this.tasksService.search(q);
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Найти задачи поблизости по координатам' })
  @ApiQuery({ name: 'lng', description: 'Долгота' })
  @ApiQuery({ name: 'lat', description: 'Широта' })
  findNearby(@Query('lng') lng: number, @Query('lat') lat: number) {
    return this.tasksService.findNearby(lng, lat);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить задачу по ID' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить задачу' })
  @ApiBody({ type: UpdateTaskDto })
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить задачу' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  // Комментарии к задаче
  @Get(':id/comments')
  @ApiOperation({ summary: 'Получить комментарии задачи' })
  getComments(@Param('id') taskId: string) {
    return this.commentsService.findByTask(taskId);
  }

  @Post(':id/comments')
  @ApiOperation({ summary: 'Добавить комментарий к задаче' })
  addComment(
    @Request() req: AuthRequest,
    @Param('id') taskId: string,
    @Body() body: { text: string },
  ) {
    return this.commentsService.create(req.user.userId, {
      taskId,
      text: body.text,
    });
  }
}

export default TasksController;
