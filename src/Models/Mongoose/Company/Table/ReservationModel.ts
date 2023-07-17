import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class ReservationModel {
  @Prop({ type: Number })
  userId: number;

  @Prop({ type: String })
  date: string;

  @Prop({ type: String })
  time: string;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationModel);
