import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class StatusModel {
  @Prop({ type: Number })
  code: number;

  @Prop({ type: Map, of: String })
  name: Map<string, string>;
}

export const StatusSchema = SchemaFactory.createForClass(StatusModel);
