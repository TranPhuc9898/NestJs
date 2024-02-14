import { Body, Controller, Post } from '@nestjs/common';
import {
  AuthCredentialsDto,
  SignUpResultDto,
} from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<SignUpResultDto> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<Partial<User>> {
    return this.authService.signIn(authCredentialsDto);
  }
}
