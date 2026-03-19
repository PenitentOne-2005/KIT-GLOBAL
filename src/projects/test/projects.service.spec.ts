import { Test, TestingModule } from '@nestjs/testing';
import ProjectsService from '../projects.service';
import { getModelToken } from '@nestjs/mongoose';

describe('ProjectsService', () => {
  let service: ProjectsService;
  const mockProjectModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    findByIdAndUpdate: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: getModelToken('Project'), useValue: mockProjectModel },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should call create on model', async () => {
    mockProjectModel.create.mockResolvedValue({
      name: 'Test Project',
      ownerId: 'user1',
    });

    const project = await service.create('user1', { name: 'Test Project' });

    expect(project.name).toEqual('Test Project');
    expect(project.ownerId).toEqual('user1');
  });
});
