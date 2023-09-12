import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService:JwtService,
    private userRepository:UserRepository,
    private configService:ConfigService
  ) {}
  async googleLogin(req, res:Response) {
    if(!req.user) {
      return 'No user from google';
    }

    let user = await this.userRepository.findUserByEmail(req.user.email);
    if(!user) {
      user = await this.userRepository.createUser(req.user.email);
    } 

    const payload = {email : user}
    const accessToken = await this.jwtService.sign(payload);

    res.cookie('DP_ACCESS_TOKEN', accessToken, {
      httpOnly: true,
      path: '/',
      secure: true, // If you are testing locally and don't have HTTPS, comment this line out.
      domain: this.configService.get<string>('CLIENT_DOMAIN'),
      maxAge: 1000 * 60 * 60, // token expiration duration
    });

    return res.redirect(this.configService.get<string>('CLIENT_URL'));
  }

  async githubLogin(req, res:Response) {
    if(!req.user) {
      return 'No user from github';
    }

    let user = await this.userRepository.findUserByEmail(req.user.email);
    if(!user) {
      user = await this.userRepository.createUser(req.user.email);
    } 

    const payload = {email : user}
    const accessToken = await this.jwtService.sign(payload);
    res.cookie('DP_ACCESS_TOKEN', accessToken, {
      httpOnly: true,
      path: '/',
      secure: true, // If you are testing locally and don't have HTTPS, comment this line out.
      domain: this.configService.get<string>('CLIENT_DOMAIN'),
      maxAge: 1000 * 60 * 60, // token expiration duration
    });
    

    return res.redirect(this.configService.get<string>('CLIENT_URL'));
  }

  async logout(res:Response) {
    res.clearCookie('DP_ACCESS_TOKEN', {
      httpOnly: true,
      path: '/',
      secure: true, // If you are testing locally and don't have HTTPS, comment this line out.
      domain: this.configService.get<string>('CLIENT_DOMAIN'),
    });

    return res.redirect(this.configService.get<string>('CLIENT_URL'));
  }
}

