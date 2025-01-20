import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service'; // Asegúrate de que AuthService esté correctamente importado
import { AuthDto } from './dto/auth.dto'; // Asumiendo que tienes un DTO para la autenticación

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}
