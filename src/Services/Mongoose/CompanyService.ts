import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CompanyDocument,
  CompanyModel,
} from '../../Models/Mongoose/Company/CompanyModel';
import ServiceResponse from '../../Utils/ServiceResponse';
import { UserDocument, UserModel } from '../../Models/Mongoose/User/UserModel';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(CompanyModel.name)
    private readonly companyModel: Model<CompanyDocument>,
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll() {
    return new ServiceResponse(
      true,
      'All companies',
      await this.companyModel.find().exec(),
      200,
    );
  }

  async getByUser(userId: string) {
    const userCompanies = await this.userModel.findById(userId).populate({
      path: 'companies',
    });
    const companyIds = userCompanies.companies.map((company) => company._id);
    const companies = await this.companyModel.find({
      _id: { $in: companyIds },
    });
    return new ServiceResponse(true, 'Companies by user', companies, 200);
  }
}
