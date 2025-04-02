import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretotemporal', // Debe ser una variable de entorno
    });
  }

  async validate(payload: any) {
    // Aquí puedes validar el payload, por ejemplo, buscar el usuario en la BD
    return { userId: payload.sub, email: payload.email, rol: payload.rol };
  }
}
