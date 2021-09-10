"use strict"
import mongoose from "mongoose";
import logger from "../../utils/logger";
const schema = mongoose.Schema;

export interface ProductAttrs {
    name: string;
    slug: string;
    images: string[];
    description?: string;
    status: string
}

interface ProductDoc extends mongoose.Document{
    name: string;
    slug: string;
    imagres: string[];
    description?: string;
    status: string
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const ProductSchema = new mongoose.Schema(
  {
    name : {
      type: String,
      required: [true, "product name is required"],
    },
    slug : {
      type: String,
      required: [true, "product slug is required"],
      unique: true
    },
    description: {
      type: String,
    },
    images: {
      type: Array,
      required: [true, "product images is required"],
    },
    status: {
      type: String,
      enum: ["active", "archived", "deleted"],
      default: "active",
    },
    meta_data: {
      type: schema.Types.Mixed,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
  ProductSchema.set("versionKey", "version");

  ProductSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
  };
  // ProductSchema.index({ username: 1 });
  // ProductSchema.index({ timestamps: 1 });

  const Product: any = mongoose.model<ProductDoc, ProductModel>(
    "Product",
    ProductSchema
  );

  export default Product;
