import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserCompanyModel, UserCompanySchema } from './UserCompany';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document {
  @Prop()
  name: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [UserCompanySchema] })
  companies: UserCompanyModel[];
}

export type UserDocument = UserModel & Document;
export const UserSchema = SchemaFactory.createForClass(UserModel);
