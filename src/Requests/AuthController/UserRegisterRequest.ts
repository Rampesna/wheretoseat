import { IsNotEmpty } from 'class-validator';

export class UserRegisterRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
