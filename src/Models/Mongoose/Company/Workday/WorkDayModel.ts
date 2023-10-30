import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { WorkHourModel, WorkHourSchema } from './WorkHour';
import { ApiProperty } from '@nestjs/swagger';
@Schema()
export class WorkDayModel {
  @ApiProperty({
    type: Number,
  })
  @Prop({ type: Number })
  day: number;

  @ApiProperty({
    type: Map,
    default: {
      en: 'Monday',
      tr: 'Pazartesi',
    },
  })
  @Prop({ type: Map, of: String })
  dayName: Map<string, string>;

  @ApiProperty({
    type: WorkHourModel,
  })
  @Prop({ type: WorkHourSchema })
  workHours: WorkHourModel;
}

export const WorkdaySchema = SchemaFactory.createForClass(WorkDayModel);
