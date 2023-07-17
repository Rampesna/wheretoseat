import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../Services/Mongoose/UserService';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAll')
  getAll() {
    return this.userService.getAll();
  }
}
