import { Schema, Document } from 'mongoose';

export interface IOrderItem extends Document {
  quantity: number;
}

export const OrderItemSchema: Schema = new Schema({
  quantity: { type: Number, required: true, min: 1 }
});
