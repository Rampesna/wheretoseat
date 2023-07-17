import { IsNotEmpty } from 'class-validator';

export class CustomerLoginRequest {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
