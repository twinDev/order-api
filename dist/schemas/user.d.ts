import { Document, Model, Schema } from 'mongoose';
import { default as User } from '../models/user';
export interface UserModel extends User, Document {
}
export declare const UserSchema: Schema;
export declare const UserModel: Model<UserModel>;
