import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService:ConfigService) {
    super({
      clientID: configService.get<string>('AUTH_GOOGLE_CLIENTID'),
      clientSecret: configService.get<string>('AUTH_GOOGLE_CLIENT_SECRET'),
      callbackURL: `${configService.get<string>('BACKEND_URL')}/auth/google/callback`,
      scope: ['email', 'profile']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const {emails} = profile;
    const user = {
      email : emails[0].value,
      accessToken
    }
    return user;
  }
}