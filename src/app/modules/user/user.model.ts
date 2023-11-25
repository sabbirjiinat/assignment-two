import { Schema, model } from 'mongoose'
import {
  TUser,
  TUserAddress,
  TUserName,
  TUserOrders,
  UserStaticModel,
} from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'

const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
})

const UserAddressSchema = new Schema<TUserAddress>({
  street: { type: String, required: [true, 'Street name is required'] },
  city: { type: String, required: [true, 'City name is required'] },
  country: { type: String, required: [true, 'Country name is required'] },
})

const UserOrderSchema = new Schema<TUserOrders>({
  productName: { type: String },
  price: { type: Number,  },
  quantity: { type: Number,  },
})

const UserSchema = new Schema<TUser, UserStaticModel>({
  userId: {
    type: Number,
    required: [true, 'User id is required'],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    type: UserNameSchema,
    required: [true, 'Full name id is required'],
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email id is required'] },
  isActive: { type: Boolean, required: [true, 'IsActive is required'] },
  hobbies: { type: [String], required: [true, 'Hobbies is required'] },
  address: {
    type: UserAddressSchema,
    required: [true, 'Address id is required'],
  },
  orders: [UserOrderSchema] ,
})

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

UserSchema.post('save', async function (doc, next) {
  doc.password = ''
  next()
})

UserSchema.statics.isUserExist = async function (id: string) {
  const existUser = UserModel.findOne({ userId: id })
  return existUser
}

export const UserModel = model<TUser, UserStaticModel>('User', UserSchema)
