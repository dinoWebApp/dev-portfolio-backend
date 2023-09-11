import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './portfolio.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PortfolioRepository } from './portfolio.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolio]),
    AuthModule
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService, PortfolioRepository]
})
export class PortfolioModule {}
