import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { CompanyService } from '../../Services/Mongoose/CompanyService';
import { AuthMiddleware } from '../../Middlewares/AuthMiddleware';

@UseInterceptors(AuthMiddleware)
@Controller('user/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('getAll')
  getAll() {
    return this.companyService.getAll();
  }

  @Get('getByUser')
  getByUser(@Req() request) {
    return this.companyService.getByUser(request.client.tokenable._id);
  }
}
