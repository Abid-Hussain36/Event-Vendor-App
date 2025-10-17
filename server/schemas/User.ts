import mongoose, { Schema, Document, Model, Types } from "mongoose";
import bycrypt from "bcryptjs";
import { IProduct } from "./Product";
import { IEvent } from "./Event";
import { IVendor } from "./Vendor";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  interests: string[];
  savedEvents: Types.ObjectId[] | IEvent[];
  registeredEvents: Types.ObjectId[] | IEvent[];
  savedVendors: Types.ObjectId[] | IVendor[];
  products: Types.ObjectId[] | IProduct[];
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  timezone: { type: String, required: true },
  interests: { type: [String], required: true, default: [] },
  savedEvents: [{ type: Schema.Types.ObjectId, ref: "Event", default: [] }],
  registeredEvents: [
    { type: Schema.Types.ObjectId, ref: "Event", default: [] },
  ],
  savedVendors: [{ type: Schema.Types.ObjectId, ref: "Vendor", default: [] }],
  products: [{ type: Schema.Types.ObjectId, ref: "Product", default: [] }],
});

// Function runs before user document is saved
// Hashes the password before saving
userSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  next();
});

// Custom method that can compare the user entered password to its potentially hashed version
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bycrypt.compare(enteredPassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
