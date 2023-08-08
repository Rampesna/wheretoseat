import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'permissions' })
export class PermissionModel extends Document {
  @Prop({ type: Map, of: String })
  name: Map<string, string>;
}

export type PermissionDocument = PermissionModel & Document;
export const PermissionSchema = SchemaFactory.createForClass(PermissionModel);
