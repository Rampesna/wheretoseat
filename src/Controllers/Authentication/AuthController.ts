import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
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
  async login(
    @Body() loginRequest: UserLoginRequest,
    @Res() response: Response,
  ) {
    const serviceResponse = await this.userService.login(
      loginRequest.email,
      loginRequest.password,
    );
    return response.status(serviceResponse.Status).json(serviceResponse);
  }

  @Post('user/auth/register')
  async register(
    @Body() registerRequest: UserRegisterRequest,
    @Res() response: Response,
  ) {
    const serviceResponse = await this.userService.register(
      registerRequest.name,
      registerRequest.email,
      registerRequest.password,
    );
    response.status(serviceResponse.Status).json(serviceResponse);
  }

  @Post('customer/auth/login')
  async customerLogin(
    @Body() loginRequest: CustomerLoginRequest,
    @Res() response: Response,
  ) {
    const serviceResponse = await this.customerService.login(
      loginRequest.email,
      loginRequest.password,
    );
    response.status(serviceResponse.Status).json(serviceResponse);
  }

  @Post('customer/auth/register')
  async customerRegister(
    @Body() registerRequest: CustomerRegisterRequest,
    @Res() response: Response,
  ) {
    const serviceResponse = await this.customerService.register(
      registerRequest.name,
      registerRequest.email,
      registerRequest.password,
    );

    response.status(serviceResponse.Status).json(serviceResponse);
  }
}
