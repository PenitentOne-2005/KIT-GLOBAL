import bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import AuthService from '../auth.service';
import UsersService from '../../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn().mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      email: 'a@b.com',
      password: bcrypt.hashSync('1234', 10),
    }),
    create: jest.fn().mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      email: 'a@b.com',
      password: bcrypt.hashSync('1234', 10),
    }),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('token123'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('register should create a new user', async () => {
    mockUsersService.findByEmail.mockResolvedValueOnce(null);

    const result = await service.register({
      email: 'a@b.com',
      password: '1234',
    });

    expect(result).toEqual({
      access_token: expect.any(String),
    });
  });

  it('login should return token', async () => {
    const loginDto = { email: 'a@b.com', password: '1234' };

    mockJwtService.sign.mockReturnValue('token123');

    const result = await service.login(loginDto);

    expect(result).toEqual({ access_token: 'token123' });
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      id: '507f1f77bcf86cd799439011',
    });
  });
});
