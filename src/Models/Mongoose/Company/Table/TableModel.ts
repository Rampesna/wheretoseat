import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { StatusModel, StatusSchema } from './StatusModel';
import { ReservationModel, ReservationSchema } from './ReservationModel';
@Schema()
export class TableModel {
  @Prop({ type: Number })
  number: number;

  @Prop({ type: Number })
  chairCount: number;

  @Prop({ type: StatusSchema })
  status: StatusModel;

  @Prop({ type: [ReservationSchema] })
  reservations: ReservationModel[];
}

export const TableSchema = SchemaFactory.createForClass(TableModel);
