import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should return error message if email is empty', async () => {
      const dto: AuthDto = { email: '', password: 'password' };
      const result = await authController.signup(dto);
      expect(result).toBe("email shouldn't be empty");
    });

    it('should return error message if password is empty', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: '' };
      const result = await authController.signup(dto);
      expect(result).toBe("password shouldn't be empty");
    });

    it('should call authService.register with correct parameters', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: 'password' };
      const registerSpy = jest.spyOn(authService, 'register').mockResolvedValue({ access_token: 'token' });
      const result = await authController.signup(dto);
      expect(registerSpy).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ access_token: 'token' });
    });
  });

  describe('login', () => {
    it('should call authService.login with correct parameters', async () => {
      const dto: AuthDto = { email: 'test@example.com', password: 'password' };
      const loginSpy = jest.spyOn(authService, 'login').mockResolvedValue({ access_token: 'token' });
      const result = await authController.login(dto);
      expect(loginSpy).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ access_token: 'token' });
    });
  });
});
