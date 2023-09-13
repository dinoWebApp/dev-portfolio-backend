import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-github2'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly configService:ConfigService,
  ) {
    super({
      clientID: configService.get<string>('AUTH_GITHUB_CLIENTID'),
      clientSecret: configService.get<string>('AUTH_GITHUB_CLIENT_SECRET'),
      callbackURL: `${configService.get<string>('BACKEND_URL')}/auth/github/callback`,
      scope: ['user:email']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const {username, emails} = profile;
    const user = {
      email : emails[0].value,
      username,
      accessToken
    }
    return user;
  }
}