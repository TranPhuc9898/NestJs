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

// Import Interface
import { JwtPayload } from './dto/jwt-payload.interface';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignUpResultDto> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const randomId = Math.floor(1000 + Math.random() * 9000).toString();
    const helloIdRandom = '#' + randomId;

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      helloId: `${helloIdRandom}`,
    });

    try {
      await this.userRepository.save(user);
      // Generate a JWT token after user registration
      const payload: JwtPayload = { username };
      const token = await this.jwtService.sign(payload);
      // // Generate a random 4-digit number for userId
      // try {
      //   // It should be something like this:
      //   const expiryDate = new Date(); // Example: Set expiry date to current date and time
      //   await this.tokenService.storeToken(helloIdRandom, token, expiryDate);
      // } catch (error) {
      //   console.error(error);
      //   throw new InternalServerErrorException('Failed to store token');
      // }
      return {
        message: 'User created successfully',
        userId: helloIdRandom,
        token,
      };
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
