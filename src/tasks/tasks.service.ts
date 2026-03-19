import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(dto: CreateTaskDto) {
    return this.taskModel.create(dto);
  }

  async findAll(filter: FilterTaskDto) {
    const query: Record<string, any> = {};

    if (filter.status) query.status = filter.status;
    if (filter.tags) query.tags = { $in: filter.tags };

    const sortField = filter.sort || 'createdAt';
    const sortOrder = filter.order === 'asc' ? 1 : -1;

    return this.taskModel.find(query).sort({ [sortField]: sortOrder });
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.taskModel.findByIdAndUpdate(id, dto, { new: true });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id);
    if (!task) throw new NotFoundException('Task not found');
    return { message: 'Task deleted' };
  }

  async search(q: string) {
    return this.taskModel.find({ $text: { $search: q } });
  }

  async findNearby(lng: number, lat: number, maxDistance = 1000) {
    return this.taskModel.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: maxDistance,
        },
      },
    });
  }

  async getStats() {
    return this.taskModel.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
  }
}

export default TasksService;
