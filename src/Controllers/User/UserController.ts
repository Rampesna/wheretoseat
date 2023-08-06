import { Controller, Get, Res } from '@nestjs/common';
import { UserService } from '../../Services/Mongoose/UserService';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAll')
  async getAll(@Res() response: Response) {
    const serviceResponse = await this.userService.getAll();
    response.status(serviceResponse.Status).json(serviceResponse);
  }
}
