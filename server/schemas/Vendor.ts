import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IEvent } from "./Event";
import { IProduct } from "./Product";

export interface IVendor extends Document {
  name: string;
  image?: string;
  city?: string;
  state?: string;
  country: string;
  isActive: boolean;
  categories: string[];
  eventsParticipated: Types.ObjectId[] | IEvent[];
  eventsPlanned: Types.ObjectId[] | IEvent[];
  products: Types.ObjectId[] | IProduct[];
}

const vendorSchema: Schema<IVendor> = new Schema({
  name: { type: String, required: true },
  image: String,
  city: String,
  state: String,
  country: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  categories: { type: [String], required: true },
  eventsParticipated: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  eventsPlanned: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Vendor: Model<IVendor> = mongoose.model<IVendor>("Vendor", vendorSchema);

export default Vendor;
