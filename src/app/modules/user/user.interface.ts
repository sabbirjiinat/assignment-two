import { Model } from 'mongoose'

export type TUserName = {
  firstName: string
  lastName: string
}

export type TUserAddress = {
  street: string
  city: string
  country: string
}

export type TUserOrders = {
  productName?: string
  price?: number
  quantity?: number
}

export type TUser = {
  userId: number
  userName: string
  password: string
  fullName: TUserName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TUserAddress
  orders?: TUserOrders[]
}

export interface UserStaticModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(id: string): Promise<TUser | null>
}
