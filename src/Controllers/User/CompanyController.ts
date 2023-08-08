import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyService } from '../../Services/Mongoose/CompanyService';
import { AuthMiddleware } from '../../Middlewares/AuthMiddleware';
import { Response } from 'express';
import { RegisterRequest } from '../../Requests/CompanyController/RegisterRequest';
import { UpdateRequest } from '../../Requests/CompanyController/UpdateRequest';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseInterceptors(AuthMiddleware)
@Controller('user/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiTags('Company')
  @Get('getByUser')
  async getByUser(@Req() request, @Res() response: Response) {
    const serviceResponse = await this.companyService.getByUser(
      request.client.tokenable._id,
    );
    response.status(serviceResponse.Status).json(serviceResponse);
  }

  @ApiTags('Company')
  @Post('register')
  async register(
    @Req() request,
    @Res() response: Response,
    @Body() registerRequest: RegisterRequest,
  ) {
    const serviceResponse = await this.companyService.create(
      request.client.tokenable._id,
      registerRequest.title,
      registerRequest.typeId,
      registerRequest.taxNumber,
      registerRequest.taxOffice,
      registerRequest.phone,
      registerRequest.email,
      registerRequest.address,
    );
    response.status(serviceResponse.Status).json(serviceResponse);
  }

  @ApiTags('Company')
  @Put('update')
  async update(
    @Req() request,
    @Res() response: Response,
    @Body() updateRequest: UpdateRequest,
  ) {
    const serviceResponse = await this.companyService.update(
      request.client.tokenable._id,
      updateRequest.companyId,
      updateRequest.title,
      updateRequest.typeId,
      updateRequest.taxNumber,
      updateRequest.taxOffice,
      updateRequest.phone,
      updateRequest.email,
      updateRequest.address,
    );
    response.status(serviceResponse.Status).json(serviceResponse);
  }
}
