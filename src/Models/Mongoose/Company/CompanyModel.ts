import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WorkDayModel, WorkdaySchema } from './Workday/WorkDayModel';
import { TableModel, TableSchema } from './Table/TableModel';
import { MenuModel, MenuSchema } from './Menu/MenuModel';
import { EventModel, EventSchema } from './EventModel';
import { CompanyTypeModel, CompanyTypeSchema } from './CompanyTypeModel';
import { CompanyStatusModel, CompanyStatusSchema } from './CompanyStatusModel';

@Schema({
  collection: 'companies',
  timestamps: true,
})
export class CompanyModel extends Document {
  @Prop({ type: [CompanyStatusSchema] })
  status: CompanyStatusModel;

  @Prop({ type: String })
  title: string;

  @Prop({ type: [CompanyTypeSchema] })
  type: CompanyTypeModel;

  @Prop({ type: String })
  taxNumber: string;

  @Prop({ type: String })
  taxOffice: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: [WorkdaySchema] })
  workDays: WorkDayModel[];

  @Prop({ type: [TableSchema] })
  tables: TableModel[];

  @Prop({ type: [MenuSchema] })
  menu: MenuModel[];

  @Prop({ type: [EventSchema] })
  events: EventModel[];
}

export type CompanyDocument = CompanyModel & Document;
export const CompanySchema = SchemaFactory.createForClass(CompanyModel);
