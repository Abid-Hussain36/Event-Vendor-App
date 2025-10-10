import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IProduct } from "./Product";
import { IEvent } from "./Event";
import { IVendor } from "./Vendor";

interface IUser extends Document {
  name: string;
  email: string;
  profilePic?: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  interests?: string[];
  savedEvents: Types.ObjectId[] | IEvent[];
  registeredEvents: Types.ObjectId[] | IEvent[];
  savedVendors: Types.ObjectId[] | IVendor[];
  products: Types.ObjectId[] | IProduct[];
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profilePic: String,
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  timezone: { type: String, required: true },
  interests: [String],
  savedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  registeredEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  savedVendors: [{ type: Schema.Types.ObjectId, ref: "Vendor" }],
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
