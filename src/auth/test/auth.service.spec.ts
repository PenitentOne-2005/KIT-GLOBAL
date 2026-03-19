import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import AuthService from '../auth.service';
import UsersService from 'src/users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
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
    // Мок метода create пользователя
    mockUsersService.create.mockResolvedValue({ id: '1', email: 'a@b.com' });

    // Вызываем register с DTO
    const result = await service.register({
      email: 'a@b.com',
      password: '1234',
    });

    expect(result).toEqual({ id: '1', email: 'a@b.com' });
    expect(mockUsersService.create).toHaveBeenCalledWith({
      email: 'a@b.com',
      password: '1234',
    });
  });

  it('login should return token', async () => {
    // Мокируем JwtService.sign
    mockJwtService.sign.mockReturnValue('token123');

    // Передаём LoginDto с email и password
    const loginDto = { email: 'a@b.com', password: '1234' };

    const result = await service.login(loginDto);

    expect(result).toEqual({ access_token: 'token123' });
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: undefined, // если login() внутри ищет пользователя по email и возвращает payload с id, тогда нужно мокать UsersService
      email: 'a@b.com',
    });
  });
});
