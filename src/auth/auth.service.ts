import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

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

    // 데이터베이스에 정보 없으면 저장
    let user = await this.userRepository.findUserByEmail(req.user.email);
    if(!user) {
      user = await this.userRepository.createUser(req.user.email);
    } 


    // 토큰 생성
    const payload = {email : user}
    const accessToken = await this.jwtService.sign(payload);

    res.cookie('DP_ACCESS_TOKEN', accessToken, {
      httpOnly: true,
      path: '/',
      secure: true, 
      domain: this.configService.get<string>('CLIENT_DOMAIN'),
      maxAge: 1000 * 60 * 60,
    });

    return res.redirect(this.configService.get<string>('CLIENT_URL'));
  }

  async githubLogin(req, res:Response) {
    if(!req.user) {
      return 'No user from github';
    }
    
    // 데이터베이스에 정보 없으면 저장
    let user = await this.userRepository.findUserByEmail(req.user.email);
    if(!user) {
      user = await this.userRepository.createUser(req.user.email);
    } 

     // 토큰 생성
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

  async getUsers():Promise<string[]> {
    return this.userRepository.getUsers();
  }
}

