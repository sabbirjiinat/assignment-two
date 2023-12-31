/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface'
import { UserModel } from './user.model'

const createUserToDB = async (userData: TUser) => {
  const existingUser = await UserModel.findOne({
    $or: [{ userId: userData.userId }, { username: userData.username }],
  })

  if (existingUser) {
    throw new Error('UserId and username need to be unique')
  }

  const result = await UserModel.create(userData)
  return result
}

const getAllUserFromDB = async () => {
  const result = await UserModel.find().select({
    userName: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  })
  return result
}

const getSingleUserFromDB = async (id: string) => {
  if (!(await UserModel.isUserExist(id))) {
    throw new Error('User not exist')
  }

  const result = await UserModel.findOne(
    { userId: id },
    { password: 0, orders: 0 },
  )
  return result
}

const updateSingleUser = async (userId: string, updatedUserData: any) => {
  if (!(await UserModel.isUserExist(userId))) {
    throw new Error('User not exist')
  }

  const result = await UserModel.updateOne(
    { userId },
    { $set: updatedUserData },
  )
  return result
}

const deleteSingleUserFromDB = async (id: string) => {
  if (!(await UserModel.isUserExist(id))) {
    throw new Error('User not exist')
  }
  const result = await UserModel.deleteOne({ userId: id })
  return result
}

const addProductToOrder = async (userId: string, productData: any) => {
  if (!(await UserModel.isUserExist(userId))) {
    throw new Error('User not exist')
  }

  const user = await UserModel.findOne({ userId })

  if (!user) {
    return { error: 'User not found' }
  }
  if (!user.orders) {
    user.orders = []
  }

  user.orders.push({
    productName: productData.productName,
    price: productData.price,
    quantity: productData.quantity,
  })
  await user.save()
  return user
}

const getAllOrdersForUser = async (userId: string) => {
  if (!(await UserModel.isUserExist(userId))) {
    throw new Error('User not exist')
  }

  const user = await UserModel.findOne({ userId })

  if (!user) {
    return { error: 'User not found' }
  }

  return user.orders || []
}

const calculateTotalPriceForUser = async (userId: string) => {
  if (!(await UserModel.isUserExist(userId))) {
    throw new Error('User not exist')
  }

  const user = await UserModel.findOne({ userId })

  if (!user) {
    return { error: 'User not found' }
  }

  const totalPrice = user.orders
    ? user.orders.reduce((total, order) => {
        const price = order.price || 0
        const quantity = order.quantity || 0
        return total + price * quantity
      }, 0)
    : 0
  return { totalPrice }
}

export const userService = {
  createUserToDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUser,
  addProductToOrder,
  getAllOrdersForUser,
  calculateTotalPriceForUser,
}
