import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CompanyDocument,
  CompanyModel,
} from '../../Models/Mongoose/Company/CompanyModel';
import ServiceResponse from '../../Utils/ServiceResponse';
import { UserDocument, UserModel } from '../../Models/Mongoose/User/UserModel';
import {
  UserCompanyDocument,
  UserCompanyModel,
} from '../../Models/Mongoose/User/UserCompanyModel';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(CompanyModel.name)
    private readonly companyModel: Model<CompanyDocument>,
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(UserCompanyModel.name)
    private readonly userCompanyModel: Model<UserCompanyDocument>,
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
    const companyIds = userCompanies.companies.map(
      (company) => company.companyId,
    );
    const companies = await this.companyModel.find({
      _id: { $in: companyIds },
    });
    return new ServiceResponse(true, 'Companies by user', companies, 200);
  }

  async create(
    userId: string,
    title: string,
    typeId: string,
    taxNumber: string,
    taxOffice: string,
    phone: string,
    email: string,
    address: string,
  ) {
    const companyModel = new this.companyModel({
      title: title,
      typeId: typeId,
      taxNumber: taxNumber,
      taxOffice: taxOffice,
      phone: phone,
      email: email,
      address: address,
    });

    const createdCompany = await companyModel.save();
    const user = await this.userModel.findById(userId);

    const userCompanyModel = new this.userCompanyModel({
      companyId: createdCompany._id,
      permissions: ['owner'],
    });
    user.companies.push(userCompanyModel);
    await user.save();

    return new ServiceResponse(true, 'Company created', createdCompany, 200);
  }
}
