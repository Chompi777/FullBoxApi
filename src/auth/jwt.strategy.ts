import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'yourSecretKey', // Reemplaza con tu clave secreta
      passReqToCallback: true, // Necesario para la estrategia con Request
    });
  }

  async validate(req: Request, payload: any) {
    // Puedes acceder al objeto Request aquí si necesitas procesarlo
    return { userId: payload.sub, username: payload.username };
  }
}
