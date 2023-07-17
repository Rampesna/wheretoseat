import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  JwtTokenDocument,
  JwtTokenModel,
} from '../../Models/Mongoose/JwtToken/JwtTokenModel';
import { sign, verify } from 'jsonwebtoken';

import ServiceResponse from '../../Utils/ServiceResponse';
import { UserDocument, UserModel } from '../../Models/Mongoose/User/UserModel';
import {
  CustomerDocument,
  CustomerModel,
} from '../../Models/Mongoose/Customer/CustomerModel';

@Injectable()
export class JwtService {
  constructor(
    @InjectModel(JwtTokenModel.name)
    private jwtTokenModel: Model<JwtTokenDocument>,
    @InjectModel(UserModel.name)
    private userModel: Model<UserDocument>,
    @InjectModel(CustomerModel.name)
    private customerModel: Model<CustomerDocument>,
  ) {}

  async create(tokenableType: string, tokenableId: string, expiresAt?: Date) {
    const token = sign(
      {
        tokenableType: tokenableType,
        tokenableId: tokenableId,
        expiresAt: expiresAt,
      },
      process.env.JWT_SECRET,
    );
    const jwtTokenModel = new this.jwtTokenModel({
      tokenableType: tokenableType,
      tokenableId: tokenableId,
      token: token,
      expiresAt: expiresAt,
    });

    const createdJwt = await jwtTokenModel.save();

    return new ServiceResponse(true, 'Created JWT', createdJwt, 200);
  }

  async verifyToken(token: string) {
    const jwtToken = await this.jwtTokenModel.findOne({
      token: token,
    });
    if (jwtToken) {
      try {
        const verifiedToken = await verify(token, process.env.JWT_SECRET);

        if (verifiedToken.tokenableType === 'user') {
          verifiedToken.tokenable = await this.userModel.findOne({
            _id: verifiedToken.tokenableId,
          });
        }

        if (verifiedToken.tokenableType === 'customer') {
          verifiedToken.tokenable = await this.customerModel.findOne({
            _id: verifiedToken.tokenableId,
          });
        }

        return new ServiceResponse(true, 'Verified token', verifiedToken, 200);
      } catch (e) {
        return new ServiceResponse(false, "Couldn't verify token", null, 404);
      }
    } else {
      return new ServiceResponse(false, 'Token is not found', null, 404);
    }
  }
}
