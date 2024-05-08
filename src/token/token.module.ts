import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../token/token.entity';
import { User } from 'src/auth/user.entity';
// make sure the path is correct

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    TypeOrmModule.forFeature([User]), // add this line
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
