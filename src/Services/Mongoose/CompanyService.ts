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
} from '../../Models/Mongoose/User/Company/UserCompanyModel';
import {
  PermissionDocument,
  PermissionModel,
} from '../../Models/Mongoose/Permission/PermissionModel';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(CompanyModel.name)
    private readonly companyModel: Model<CompanyDocument>,
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(UserCompanyModel.name)
    private readonly userCompanyModel: Model<UserCompanyDocument>,
    @InjectModel(PermissionModel.name)
    private readonly permissionModel: Model<PermissionDocument>,
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
    const getCompanyByTaxNumber = await this.companyModel
      .findOne({
        taxNumber: taxNumber,
      })
      .exec();

    if (getCompanyByTaxNumber) {
      return new ServiceResponse(
        false,
        'Company with this tax number already exists',
        null,
        400,
      );
    }

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
    const allAPermissions = await this.permissionModel.find();

    const userCompanyModel = new this.userCompanyModel({
      companyId: createdCompany._id,
      permissions: allAPermissions.map((permission) => permission._id),
    });
    user.companies.push(userCompanyModel);
    await user.save();

    return new ServiceResponse(true, 'Company created', createdCompany, 200);
  }

  async update(
    userId: string,
    companyId: string,
    title: string,
    typeId: string,
    taxNumber: string,
    taxOffice: string,
    phone: string,
    email: string,
    address: string,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return new ServiceResponse(false, 'User not found', null, 404);
    }

    // check if companyId is in user.companies
    const userCompany = user.companies.find(
      (userCompany) => userCompany.companyId == companyId,
    );

    if (!userCompany) {
      return new ServiceResponse(false, 'Company not found', null, 404);
    }

    const company = await this.companyModel.findById(companyId);
    if (!company) {
      return new ServiceResponse(false, 'Company not found', null, 404);
    }

    company.title = title;
    company.typeId = typeId;
    company.taxNumber = taxNumber;
    company.taxOffice = taxOffice;
    company.phone = phone;
    company.email = email;
    company.address = address;

    await company.save();

    return new ServiceResponse(true, 'Company updated', company, 200);
  }
}
