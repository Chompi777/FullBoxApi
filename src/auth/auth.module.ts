import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard'; // Asegúrate de importar el guard
import { PrismaService } from '../prisma.service'; // Si usas Prisma

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),  // Configura Passport
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // Cambia por tu clave secreta real
      signOptions: {
        expiresIn: '1h', // Tiempo de expiración del token
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, PrismaService],  // Incluye todos los providers necesarios
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],  // Exporte JwtStrategy si es necesario en otro módulo
})
export class AuthModule {}
