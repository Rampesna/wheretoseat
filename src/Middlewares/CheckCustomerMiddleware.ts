import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../Services/Mongoose/JwtService';
import ServiceResponse from '../Utils/ServiceResponse';

@Injectable()
export class CheckCustomerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (request.client.tokenableType !== 'customer') {
      return response.json(
        new ServiceResponse(false, 'Invalid token', null, 401),
      );
    }

    next();
  }
}
