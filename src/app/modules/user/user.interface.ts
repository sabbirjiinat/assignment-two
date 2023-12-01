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
  username: string
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







// {
//   "userId": 5,
//   "userName": "john_doeu",
//   "password": "secure_password",
//   "fullName": {
//       "firstName": "John",
//       "lastName": "Doe"
//   },
//   "age": 25,
//   "email": "john.doe@example.com",
//   "isActive": true,
//   "hobbies": [
//       "Reading",
//       "Gaming"
//   ],
//   "address": {
//       "street": "123 Main Street",
//       "city": "Anytown",
//       "country": "Country"
//   },
//   "orders": [
//       {
//           "productName": "Product 1",
//           "price": 29.99,
//           "quantity": 2
//       },
//       {
//           "productName": "Product 2",
//           "price": 49.99,
//           "quantity": 1
//       }
//   ]
// }