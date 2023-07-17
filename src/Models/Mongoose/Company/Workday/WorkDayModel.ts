import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { WorkHourModel, WorkHourSchema } from './WorkHour';
@Schema()
export class WorkDayModel {
  @Prop({ type: Number })
  day: number;

  @Prop({ type: Map, of: String })
  dayName: Map<string, string>;

  @Prop({ type: [WorkHourSchema] })
  workHours: WorkHourModel[];
}

export const WorkdaySchema = SchemaFactory.createForClass(WorkDayModel);
