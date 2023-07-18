import { Controller, Get, Req, Res, UseInterceptors } from '@nestjs/common';
import { CompanyService } from '../../Services/Mongoose/CompanyService';
import { AuthMiddleware } from '../../Middlewares/AuthMiddleware';
import { Response } from 'express';

@UseInterceptors(AuthMiddleware)
@Controller('user/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('getAll')
  async getAll(@Res() response: Response) {
    const serviceResponse = await this.companyService.getAll();
    response.status(serviceResponse.Status).json(serviceResponse);
  }

  @Get('getByUser')
  async getByUser(@Req() request, @Res() response: Response) {
    const serviceResponse = await this.companyService.getByUser(
      request.client.tokenable._id,
    );
    response.status(serviceResponse.Status).json(serviceResponse);
  }
}
