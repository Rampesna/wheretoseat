import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'customers',
  timestamps: true,
})
export class CustomerModel extends Document {
  @Prop()
  name: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  password: string;
}

export type CustomerDocument = CustomerModel & Document;
export const CustomerSchema = SchemaFactory.createForClass(CustomerModel);
