import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PackagesService } from './packages.service';

@Controller('packages')
export class PackagesController {
  constructor(private packagesService: PackagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPackage(@Body() data: { name: string; weight: number }) {
    return this.packagesService.createPackage(data);
  }
}
