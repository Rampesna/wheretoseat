import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../Services/Mongoose/JwtService';
import ServiceResponse from '../Utils/ServiceResponse';
import { UserService } from '../Services/Mongoose/UserService';
import { CompanyService } from '../Services/Mongoose/CompanyService';

@Injectable()
export class CheckUserHasCompanyMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = await this.userService.getById(request.client.tokenable._id);

    if (!user.Success) {
      return response.json(user);
    }

    next();
  }
}
