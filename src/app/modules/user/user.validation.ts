import { z } from 'zod'

const UserNameZodSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string({ required_error: 'Last name is required' }),
})

const UserAddressZodSchema = z.object({
  street: z.string({ required_error: 'Street is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
})

const UserOrderZodSchema = z.object({
  productName: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
})

export const UserZodSchema = z.object({
  userId: z.number({ required_error: 'User ID is required' }),
  userName: z.string({ required_error: 'User name is required' }),
  password: z.string({ required_error: 'Password is required' }).max(30).min(6),
  fullName: UserNameZodSchema,
  age: z.number({ required_error: 'Age is required' }),
  email: z.string({ required_error: 'Email is required' }).email(),
  isActive: z.boolean({ required_error: 'isActive is required' }),
  hobbies: z.array(z.string({ required_error: 'Hobbies are required' })),
  address: UserAddressZodSchema,
  orders: z.array(UserOrderZodSchema).optional(),
})
