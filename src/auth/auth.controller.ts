import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  signup(@Body() dto: AuthDto) {
    if (!dto.email) {
      return "email shouldn't be empty";
    } else if (!dto.password) {
      return "password shouldn't be empty";
    }
    return this.authService.register(dto);
  }

  @Post('/login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
