import { IsNotEmpty, IsString, Matches } from 'class-validator';

// Credentials and password
export class AuthCredentialsDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  // use Regex
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {})
  password: string;
}

export class SignUpResultDto {
  message: string;
  userId: string;
  token: string; // new field
}
