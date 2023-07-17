import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ProductModel, ProductSchema } from './ProductModel';
@Schema()
export class MenuModel {
  @Prop({ type: Map, of: String })
  name: Map<string, string>;

  @Prop({ type: Map, of: String })
  description: Map<string, string>;

  @Prop({ type: String })
  image: string;

  @Prop({ type: [ProductSchema] })
  products: ProductModel[];
}

export const MenuSchema = SchemaFactory.createForClass(MenuModel);
