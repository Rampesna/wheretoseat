import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../Services/Mongoose/JwtService';
import ServiceResponse from '../Utils/ServiceResponse';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    if (!request.headers.authorization) {
      return response.json(
        new ServiceResponse(false, 'No authorization header', null, 401),
      );
    }

    const headerToken = request.headers.authorization.split(' ')[1];

    if (!headerToken) {
      return response.json(
        new ServiceResponse(false, 'No authorization header', null, 401),
      );
    }

    const jwtToken = await this.jwtService.verifyToken(headerToken);

    if (!jwtToken.Success) {
      return response.json(
        new ServiceResponse(false, 'Invalid token', jwtToken.Data, 401),
      );
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.client = jwtToken.Data;

    next();
  }
}
