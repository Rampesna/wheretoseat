import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CustomerService } from '../../Services/Mongoose/CustomerService';
import { AuthMiddleware } from '../../Middlewares/AuthMiddleware';
import { CheckCustomerMiddleware } from '../../Middlewares/CheckCustomerMiddleware';

@UseInterceptors(AuthMiddleware, CheckCustomerMiddleware)
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('getAll')
  getAll() {
    return this.customerService.getAll();
  }
}
