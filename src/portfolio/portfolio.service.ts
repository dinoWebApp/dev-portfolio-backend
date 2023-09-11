import { Injectable } from '@nestjs/common';
import { PortfolioRepository } from './portfolio.repository';
import { Portfolio } from './portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(private portfolioRepository:PortfolioRepository) {}
  getPortfolio(req) {
    return this.portfolioRepository.getPortfolio(req);
  }

  getPublicPortfolio(id:string):Promise<Portfolio> {
    return this.portfolioRepository.getPublicPortfolio(id);
  }

  postPortfolio(req, data) {
    return this.portfolioRepository.postPortfolio(req, data);
  }

  patchPortfolio(req, data) {
    return this.portfolioRepository.patchPortfolio(req, data);
  }
}
