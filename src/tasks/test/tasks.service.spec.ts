import { Test, TestingModule } from '@nestjs/testing';
import TasksService from '../tasks.service';
import { getModelToken } from '@nestjs/mongoose';

describe('TasksService', () => {
  let service: TasksService;

  const mockTaskModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    sort: jest.fn().mockReturnValue(['task1', 'task2']),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: getModelToken('Task'), useValue: mockTaskModel },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should call create on model', async () => {
    mockTaskModel.create.mockResolvedValue({ title: 'Test Task' });
    const task = await service.create({ title: 'Test Task' });
    expect(task.title).toEqual('Test Task');
    expect(mockTaskModel.create).toHaveBeenCalled();
  });

  it('findAll should call find and sort', async () => {
    mockTaskModel.sort.mockReturnValue(['task1', 'task2']); // результат сортировки
    const tasks = await service.findAll({});
    expect(mockTaskModel.find).toHaveBeenCalled();
    expect(mockTaskModel.sort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(tasks).toEqual(['task1', 'task2']);
  });

  it('update should call findByIdAndUpdate', async () => {
    mockTaskModel.findByIdAndUpdate.mockResolvedValue({ title: 'Updated' });
    const task = await service.update('id1', { title: 'Updated' });
    expect(task.title).toEqual('Updated');
    expect(mockTaskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'id1',
      { title: 'Updated' },
      { new: true },
    );
  });

  it('remove should call findByIdAndDelete', async () => {
    mockTaskModel.findByIdAndDelete.mockResolvedValue({});
    await service.remove('id1');
    expect(mockTaskModel.findByIdAndDelete).toHaveBeenCalledWith('id1');
  });
});
