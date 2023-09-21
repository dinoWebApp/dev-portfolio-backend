import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { InternalServerErrorException } from "@nestjs/common";

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }
  async createUser(email:string):Promise<string> {
    const user = this.userRepository.create({email});
    try {
      await this.userRepository.save(user);
      return user.email
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email:string):Promise<string> {
    const user = await this.userRepository.findOneBy({email});
    if(!user) {
      return ''
    } else {
      return user.email;
    }
    
  }

  async getUsers(): Promise<string[]> {
    let users = await this.userRepository.find({
      select: ["email"]
    });
    return users.map(user=>user.email);
  }
}