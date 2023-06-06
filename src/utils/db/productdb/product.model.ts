import { Schema, model } from 'mongoose';
import {IProductDocument, IProductModel, IReview} from './product.interface';

// Create Review Schema
const reviewSchema = new Schema<IReview>(
	{
		name: { type: String, required: true },
		// Individual rating
		rating: { type: Number, required: true },
		comment: { type: String, required: true },
		user: {
			type: Schema.Types.ObjectId, // Gets id of User
			required: true,
			ref: 'User', // Adds relationship between Review and User
		},
	},
	{
		timestamps: true,
	}
)

// Create Product Schema
const productSchema = new Schema<IProductDocument, IProductModel>(
	{
		user: {
			type: Schema.Types.ObjectId, // Gets id of User
			required: true,
			ref: 'User', // Adds relationship between Product and User
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		reviews: [reviewSchema],
		// Average rating
		rating: {
			type: Number,
			required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
)

const Product: IProductModel = model<IProductDocument, IProductModel>('Product', productSchema);

export default Product;
