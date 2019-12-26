import { Document, Model, Schema } from 'mongoose';
import { default as Order } from '../models/order';
export interface OrderModel extends Order, Document {
}
export declare const OrderSchema: Schema;
export declare const OrderModel: Model<OrderModel>;
