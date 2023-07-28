import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import {
  CustomerDocument,
  CustomerModel,
} from '../../Models/Mongoose/Customer/CustomerModel';
import ServiceResponse from '../../Utils/ServiceResponse';
import { JwtService } from './JwtService';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(CustomerModel.name)
    private readonly customerModel: Model<CustomerDocument>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const customer = await this.customerModel.findOne({
      email: email,
    });
    if (customer) {
      if (bcrypt.compareSync(password, customer.password)) {
        const jwtResponse = await this.jwtService.create(
          'customer',
          customer._id.toString(),
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
      return new ServiceResponse(false, 'Customer not found', null, 404);
    }
  }

  async register(name: string, email: string, password: string) {
    const checkEmailAlreadyExists = await this.customerModel.findOne({
      email: email,
    });
    if (checkEmailAlreadyExists) {
      return new ServiceResponse(false, 'Email already exists', null, 400);
    }
    const customerModel = new this.customerModel({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });

    const createdCustomer = await customerModel.save();

    const jwtResponse = await this.jwtService.create(
      'customer',
      createdCustomer._id.toString(),
      null,
    );

    return new ServiceResponse(
      true,
      'Customer created',
      {
        token: jwtResponse.Data.token,
      },
      200,
    );
  }

  async getAll() {
    return new ServiceResponse(
      true,
      'All customers',
      await this.customerModel.find().exec(),
      200,
    );
  }
}
