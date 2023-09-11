import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {

  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Request() req) {

  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req, @Res() res:Response) {
    return this.authService.googleLogin(req, res);
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Request() req, @Res() res:Response) {
    return this.authService.githubLogin(req, res);
  }

  @Get('logout')
  logout(@Res() res:Response) {
    return this.authService.logout(res);
  }


}
