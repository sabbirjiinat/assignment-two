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
  username: z.string({ required_error: 'User name is required' }),
  password: z.string({ required_error: 'Password is required' }).max(30).min(6),
  fullName: UserNameZodSchema,
  age: z.number({ required_error: 'Age is required' }),
  email: z.string({ required_error: 'Email is required' }).email(),
  isActive: z.boolean({ required_error: 'isActive is required' }),
  hobbies: z.array(z.string({ required_error: 'Hobbies are required' })),
  address: UserAddressZodSchema,
  orders: z.array(UserOrderZodSchema).optional(),
})








const UpdateUserNameZodSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }).optional(),
  lastName: z.string({ required_error: 'Last name is required' }).optional(),
})

const UpdateUserAddressZodSchema = z.object({
  street: z.string({ required_error: 'Street is required' }).optional(),
  city: z.string({ required_error: 'City is required' }).optional(),
  country: z.string({ required_error: 'Country is required' }).optional(),
})

const UpdateUserOrderZodSchema = z.object({
  productName: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
})

export const UpdateUserZodSchema = z.object({
  userId: z.number({ required_error: 'User ID is required' }).optional(),
  username: z.string({ required_error: 'User name is required' }).optional(),
  password: z.string({ required_error: 'Password is required' }).max(30).min(6).optional(),
  fullName: UpdateUserNameZodSchema.optional(),
  age: z.number({ required_error: 'Age is required' }).optional(),
  email: z.string({ required_error: 'Email is required' }).email().optional(),
  isActive: z.boolean({ required_error: 'isActive is required' }).optional(),
  hobbies: z.array(z.string({ required_error: 'Hobbies are required' })).optional(),
  address: UpdateUserAddressZodSchema.optional(),
  orders: z.array(UpdateUserOrderZodSchema).optional(),
})



