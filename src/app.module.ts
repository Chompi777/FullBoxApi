import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';  // Asegúrate de importar el módulo de Prisma
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtAuthGuard } from './auth/jwt-auth.guard'; // Importa el guard

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey', // Usa la clave secreta adecuada para JWT
      signOptions: { expiresIn: '1h' }, // Opciones de expiración
    }),
    PrismaModule, // Asegúrate de incluir PrismaModule aquí
  ],
  providers: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
})
export class AppModule {}
