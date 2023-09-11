import { type } from "os";
import { Portfolio } from "src/portfolio/portfolio.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  email:string;

  @OneToOne(type => Portfolio, portfolio => portfolio.user, {eager:true})
  @JoinColumn()
  portfolio:Portfolio;

}