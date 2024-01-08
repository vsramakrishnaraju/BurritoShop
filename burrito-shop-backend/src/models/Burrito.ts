import mongoose, { Document, Schema } from 'mongoose';

export interface IBurrito extends Document {
  name: string;
  size: 'regular' | 'XL';
  price: number;
}

const BurritoSchema: Schema = new Schema({
  name: { type: String, required: true },
  size: { type: String, required: true, enum: ['regular', 'XL'] },
  price: { type: Number, required: true }
});

const Burrito = mongoose.model<IBurrito>('Burrito', BurritoSchema);
export default Burrito;