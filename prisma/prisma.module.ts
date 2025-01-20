// src/prisma/prisma.module.ts
import { Module } from '@nestjs/common';
//import { PrismaService } from '../src/prisma.service';
import { PrismaService } from '../src/prisma.service';  // Ajusta la ruta si es necesario

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Esto permite que PrismaService sea accesible desde otros módulos
})
export class PrismaModule {}
