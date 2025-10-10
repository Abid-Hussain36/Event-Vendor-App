import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IVendor } from "./Vendor";

export interface IProduct extends Document {
  name: string;
  image: string;
  price: number;
  quantity: number;
  vendor: Types.ObjectId | IVendor;
}

const productSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
});

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default Product;
