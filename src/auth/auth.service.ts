import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';  // Si usas Prisma
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';  // Importa el DTO
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(authDto: AuthDto) {
    const { email, password } = authDto;

    // Verifica si el usuario ya existe
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      throw new Error('User already exists');
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el nuevo usuario, asegúrate de incluir un campo 'name' (puedes reemplazar 'defaultName')
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'defaultName', // Asegúrate de proporcionar un nombre aquí
      },
    });

    // Genera el JWT
    const payload = { sub: user.id, username: user.email };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }

  async login(authDto: AuthDto) {
    const { email, password } = authDto;

    // Busca el usuario en la base de datos
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verifica la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Genera el JWT
    const payload = { sub: user.id, username: user.email };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
