import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { ConfigService } from "@nestjs/config";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userRepository:UserRepository,
    private configService:ConfigService
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload) {
    const { email } = payload;
    const user:User = await this.userRepository.findOneBy({ email })
    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}