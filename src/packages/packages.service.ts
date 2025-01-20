import { Injectable } from '@nestjs/common';

@Injectable()
export class PackagesService {
  private packages = [];

  createPackage(data: any) {
    const newPackage = { id: this.packages.length + 1, ...data };
    this.packages.push(newPackage);
    return newPackage;
  }

  getAllPackages() {
    return this.packages;
  }
}
