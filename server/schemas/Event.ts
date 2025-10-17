import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IVendor } from "./Vendor";

// The object ttpe for event when we fetch events on
export interface IEvent extends Document {
  name: string;
  image?: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  startTime: Date;
  endTime?: Date;
  timeZone: string;
  categories: string[];
  vendorList: Types.ObjectId[] | IVendor[];
}

// The schema in which an event will be saved in the MongoDB database
const eventSchema: Schema<IEvent> = new Schema({
  name: { type: String, required: true },
  image: String,
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: Date,
  timeZone: { type: String, required: true },
  categories: { type: [String], required: true },
  vendorList: [{ type: Schema.Types.ObjectId, ref: "Vendor" }],
});

// We create a model that can be used to perform CRUD operations on the subseqent Event collection
// The Event collection is created when we push the first element to it
const Event: Model<IEvent> = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
