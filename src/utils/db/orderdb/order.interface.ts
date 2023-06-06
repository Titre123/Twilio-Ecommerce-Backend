import { Document, Model, Types } from 'mongoose';


interface IUser {
  _id: Types.ObjectId;
  // Define other properties of the User model
}

interface IProduct {
  _id: Types.ObjectId;
  // Define other properties of the Product model
}

interface IOrderItem {
  name: string;
  qty: number;
  image: string;
  price: string;
  product: IProduct['_id'];
}

interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface IPaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

interface IOrderBase {
  user: IUser['_id'];
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentResult: IPaymentResult;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}

export interface IOrderDocument extends IOrderBase, Document {}

export interface IOrderModel extends Model<IOrderDocument> {}