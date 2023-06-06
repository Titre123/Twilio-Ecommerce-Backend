import { Document, Model, Types } from 'mongoose';

interface IUser {
  _id: Types.ObjectId;
  // Define other properties of the User model
}

export interface IReview {
  name: string;
  rating: number;
  comment: string;
  user: IUser['_id'];
}

interface IProductBase {
  user: IUser['_id'];
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: IReview[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

export interface IProductDocument extends IProductBase, Document {}

export interface IProductModel extends Model<IProductDocument> {}