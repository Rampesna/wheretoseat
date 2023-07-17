import { IsNotEmpty } from 'class-validator';

export class UserLoginRequest {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
