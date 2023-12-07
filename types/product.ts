import mongoose from "mongoose";
export type Product = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unitOfMeasure: string,
  category: string;
  brand: string;
  sku: string;
  supplier: mongoose.Schema.Types.ObjectId;
};