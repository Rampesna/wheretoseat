import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../../Services/Mongoose/UserService';
import { UserLoginRequest } from '../../Requests/AuthController/UserLoginRequest';
import { UserRegisterRequest } from '../../Requests/AuthController/UserRegisterRequest';
import { CustomerLoginRequest as CustomerLoginRequest } from '../../Requests/AuthController/CustomerLoginRequest';
import { CustomerRegisterRequest as CustomerRegisterRequest } from '../../Requests/AuthController/CustomerRegisterRequest';
import { CustomerService } from '../../Services/Mongoose/CustomerService';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly customerService: CustomerService,
  ) {}

  @Post('user/auth/login')
  login(@Body() loginRequest: UserLoginRequest) {
    return this.userService.login(loginRequest.email, loginRequest.password);
  }

  @Post('user/auth/register')
  register(@Body() registerRequest: UserRegisterRequest) {
    return this.userService.register(
      registerRequest.name,
      registerRequest.email,
      registerRequest.password,
    );
  }

  @Post('customer/auth/login')
  customerLogin(@Body() loginRequest: CustomerLoginRequest) {
    return this.customerService.login(
      loginRequest.email,
      loginRequest.password,
    );
  }

  @Post('customer/auth/register')
  customerRegister(@Body() registerRequest: CustomerRegisterRequest) {
    return this.customerService.register(
      registerRequest.name,
      registerRequest.email,
      registerRequest.password,
    );
  }
}
