import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class EventModel {
  @Prop({ type: Map, of: String })
  name: Map<string, string>;

  @Prop({ type: Map, of: String })
  description: Map<string, string>;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  date: string;

  @Prop({ type: String })
  time: string;

  @Prop({ type: Number })
  reservationPrice: number;
}

export const EventSchema = SchemaFactory.createForClass(EventModel);
