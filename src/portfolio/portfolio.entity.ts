import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Portfolio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type:'json'})
  aboutme:any;

  @Column({type:'json'})
  skills:any;

  @Column({type:'json'})
  projects:any;

  @OneToOne(type => User, user => user.portfolio)
  user:User

}