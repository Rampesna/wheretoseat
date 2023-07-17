import { IsNotEmpty } from 'class-validator';

export class CustomerRegisterRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
