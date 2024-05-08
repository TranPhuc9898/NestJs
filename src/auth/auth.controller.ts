import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import {
  AuthCredentialsDto,
  SignUpResultDto,
} from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('findUserByHelloId')
  async findUserByHelloId(
    @Body('helloId') helloId: string,
  ): Promise<User | undefined> {
    return this.authService.findUserByHelloId(helloId);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    // Triggers the Facebook login process
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Req() req): Promise<any> {
    // Handles the Facebook login callback
    return req.user; // Or however you choose to respond
  }
}
