import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async storeToken(
    helloId: string,
    token: string,
    expiryDate: Date = null,
  ): Promise<void> {
    console.log(`Storing token for user ${helloId}: ${token}`);
    const user = await this.userRepository.findOne({ helloId });
    if (!user) {
      console.log(`User ${helloId} not found`);
      return;
    }
    const newToken = this.tokenRepository.create({
      user,
      token,
      expiryDate,
      helloId: user.helloId,
    }); // Thêm helloId vào đối tượng Token
    await this.tokenRepository.save(newToken);
    console.log(`Token stored successfully for user ${helloId}`);
  }
}
