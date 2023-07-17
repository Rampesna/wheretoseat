import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class WorkHourModel {
  @Prop({ type: String })
  start: string;

  @Prop({ type: String })
  end: string;
}

export const WorkHourSchema = SchemaFactory.createForClass(WorkHourModel);
