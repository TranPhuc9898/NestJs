import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AuthCredentialsDto,
  SignUpResultDto,
} from './dto/auth-credentials.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignUpResultDto> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const randomId = Math.floor(1000 + Math.random() * 9000).toString();
    const userId = '#' + randomId;

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      helloId: `${userId}`,
    });

    try {
      await this.userRepository.save(user);

      // Generate a random 4-digit number for userId

      return { message: 'User created successfully', userId: userId };
    } catch (error) {
      // handle error
      if (error.code === '23505') {
        // Unique constraint error
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<Partial<User>> {
    const { username, password } = authCredentialsDto;

    const user = await this.userRepository.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { id, helloId, username } = user;
      return { id, helloId, username };
    } else {
      throw new UnauthorizedException(
        'Kiểm tra lại user hoặc mật khẩu hem đúng',
      );
    }
  }

  async findUserByHelloId(helloId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ helloId });
  }
}
