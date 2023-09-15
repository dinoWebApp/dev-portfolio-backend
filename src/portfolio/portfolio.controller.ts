import { Body, Controller, Get, Param, Patch, Post, Req, Request, UseGuards } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { AuthGuard } from '@nestjs/passport';
import { Portfolio } from './portfolio.entity';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService:PortfolioService) {}
  
  @Get()
  // 인증된 유저만 이용가능
  @UseGuards(AuthGuard('jwt'))
  getPortfolio(@Request() req) {
    return this.portfolioService.getPortfolio(req);
  }

  @Get('/:id')
  // 누구나 이용가능 (제출용)
  getPublicPortfolio(@Param('id') id:string):Promise<Portfolio> {
    return this.portfolioService.getPublicPortfolio(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  postPortfolio(@Request() req, @Body() data) {
    return this.portfolioService.postPortfolio(req, data);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  patchPortfolio(@Request() req, @Body() data) {
    return this.portfolioService.patchPortfolio(req, data);
  }
}
