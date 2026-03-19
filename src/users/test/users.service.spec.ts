import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import UsersService from '../users.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockUserModel = {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('User'), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should call find on model', async () => {
    mockUserModel.find.mockResolvedValue(['user1', 'user2']);
    const users = await service.findAll();
    expect(users).toEqual(['user1', 'user2']);
    expect(mockUserModel.find).toHaveBeenCalled();
  });

  it('findById should call findById on model', async () => {
    mockUserModel.findById.mockResolvedValue({ name: 'Test' });
    const user = await service.findById('id1');
    expect(user).toEqual({ name: 'Test' });
    expect(mockUserModel.findById).toHaveBeenCalledWith('id1');
  });
});
