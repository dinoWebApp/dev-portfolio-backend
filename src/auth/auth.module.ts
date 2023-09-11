import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './github.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configService:ConfigService) =>({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject:[ConfigService]
    }),
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, GithubStrategy, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
