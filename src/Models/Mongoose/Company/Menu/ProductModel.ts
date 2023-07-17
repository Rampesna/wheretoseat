import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ProductModel {
  @Prop({ type: Map, of: String })
  name: Map<string, string>;

  @Prop({ type: Map, of: String })
  description: Map<string, string>;

  @Prop({ type: String })
  image: string;

  @Prop({ type: Number })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
