import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument, UserModel } from '../../Models/Mongoose/User/UserModel';
import ServiceResponse from '../../Utils/ServiceResponse';
import { JwtService } from './JwtService';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({
      email: email,
    });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const jwtResponse = await this.jwtService.create(
          'user',
          user._id.toString(),
          null,
        );
        return new ServiceResponse(
          true,
          'Login successful',
          {
            token: jwtResponse.Data.token,
          },
          200,
        );
      } else {
        return new ServiceResponse(false, 'Incorrect password', null, 400);
      }
    } else {
      return new ServiceResponse(false, 'User not found', null, 404);
    }
  }

  async register(name: string, email: string, password: string) {
    const checkEmailAlreadyExists = await this.userModel.findOne({
      email: email,
    });
    if (checkEmailAlreadyExists) {
      return new ServiceResponse(false, 'Email already exists', null, 400);
    }
    const userModel = new this.userModel({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });

    const createdUser = await userModel.save();

    const jwtResponse = await this.jwtService.create(
      'user',
      createdUser._id.toString(),
      null,
    );

    return new ServiceResponse(
      true,
      'User created',
      {
        token: jwtResponse.Data.token,
      },
      200,
    );
  }

  async getAll() {
    return new ServiceResponse(
      true,
      'All users',
      await this.userModel.find().exec(),
      200,
    );
  }
}
