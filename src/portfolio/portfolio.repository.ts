import { Repository } from "typeorm";
import { Portfolio } from "./portfolio.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";

export class PortfolioRepository extends Repository<Portfolio> {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository:Repository<Portfolio>
  ) {
    super(portfolioRepository.target, portfolioRepository.manager, portfolioRepository.queryRunner);
  }

  async getPortfolio(req) {
    let portfolio = await this.portfolioRepository.findOne({
      where: {
        user: {
          email : req.user.email
        }
      }
    });
    if(!portfolio) {
      throw new NotFoundException('There is no portfolio');
    }
    return portfolio;
  }

  async getPublicPortfolio(id:string):Promise<Portfolio> {
    let portfolio = await this.portfolioRepository.findOne({
      where: {
        user: {
          email: id
        }
      }
    });
    if(!portfolio) {
      throw new NotFoundException('There is no portfolio');
    }
    return portfolio;
  }

  async postPortfolio(req, data) {
    let portfolio = {
      aboutme : data.aboutMe,
      skills : data.skills,
      projects : data.projects,
      user : req.user
    }
    let savePortfolio = this.portfolioRepository.create(portfolio);
    await this.portfolioRepository.save(savePortfolio);
    return savePortfolio;
  }

  async patchPortfolio(req, data) {
    let portfolio = await this.portfolioRepository.findOne({
      where: {
        user: {
          email : req.user.email
        }
      }
    });
    portfolio.aboutme = data.aboutMe;
    portfolio.skills = data.skills;
    portfolio.projects = data.projects;

    let save = await this.portfolioRepository.save(portfolio);
    return save;
  }
}