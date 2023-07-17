import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'companyTypes',
  timestamps: true,
})
export class CompanyTypeModel extends Document {
  @Prop({ type: Map, of: String })
  name: Map<string, string>;
}

export type CompanyTypeDocument = CompanyTypeModel & Document;
export const CompanyTypeSchema = SchemaFactory.createForClass(CompanyTypeModel);
