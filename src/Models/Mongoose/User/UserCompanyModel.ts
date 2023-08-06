import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'userCompanies',
  _id: false,
})
export class UserCompanyModel {
  @Prop({ type: String, required: true })
  companyId: string;

  @Prop({ type: [String], default: [] })
  permissions: string[];
}

export type UserCompanyDocument = UserCompanyModel & Document;

export const UserCompanySchema = SchemaFactory.createForClass(UserCompanyModel);
