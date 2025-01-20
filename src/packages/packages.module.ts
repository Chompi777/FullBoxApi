import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey', // Usa tu clave secreta aquí
      signOptions: { expiresIn: '1h' }, // Opcional: tiempo de expiración
    }),
    // Otros módulos que puedas necesitar
  ],
  providers: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
})
export class PackagesModule {}
