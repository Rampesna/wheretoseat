import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types, Document } from 'mongoose';

@Schema({
  collection: 'userCompanies',
  timestamps: true,
})
export class UserCompanyModel extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'companies' })
  _id: Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'permissions' }],
  })
  permissions: Types.ObjectId[];
}

export type UserCompanyDocument = UserCompanyModel & Document;
export const UserCompanySchema = SchemaFactory.createForClass(UserCompanyModel);
