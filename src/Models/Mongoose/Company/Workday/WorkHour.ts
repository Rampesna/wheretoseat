import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class WorkHourModel {
  @ApiProperty()
  @Prop({ type: String })
  start: string;

  @ApiProperty()
  @Prop({ type: String })
  end: string;
}

export const WorkHourSchema = SchemaFactory.createForClass(WorkHourModel);
