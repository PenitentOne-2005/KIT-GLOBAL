import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import UsersService from '../users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserModel = {
    find: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue([{ id: '1', email: 'a@b.com' }]),
    }),
    findById: jest.fn().mockReturnValue({
      select: jest
        .fn()
        .mockResolvedValue({ id: '1', email: 'a@b.com', password: 'hashed' }),
    }),
    create: jest
      .fn()
      .mockResolvedValue({ _id: '1', email: 'a@b.com', password: 'hashed' }),
    findByIdAndUpdate: jest
      .fn()
      .mockResolvedValue({ id: '1', email: 'updated@b.com' }),
    findByIdAndDelete: jest.fn().mockResolvedValue({}),
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
    const users = await service.findAll();

    expect(users).toEqual([{ id: '1', email: 'a@b.com' }]);
    expect(mockUserModel.find).toHaveBeenCalled();
  });

  it('findById should call findById on model', async () => {
    const user = await service.findById('id1');

    expect(user).toEqual({
      id: '1',
      email: 'a@b.com',
      password: 'hashed',
    });
    expect(mockUserModel.findById).toHaveBeenCalledWith('id1');
  });
});
