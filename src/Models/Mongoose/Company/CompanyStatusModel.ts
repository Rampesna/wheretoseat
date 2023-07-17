import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'companyStatuses',
  timestamps: true,
})
export class CompanyStatusModel extends Document {
  // Active or Passive with 0 and 1
  @Prop({ required: true })
  code: number;

  @Prop({ type: Map, of: String })
  name: Map<string, string>;
}

export type CompanyStatusDocument = CompanyStatusModel & Document;
export const CompanyStatusSchema =
  SchemaFactory.createForClass(CompanyStatusModel);
