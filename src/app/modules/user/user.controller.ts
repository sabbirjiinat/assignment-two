import { Request, Response } from 'express'
import { userService } from './user.service'
import { UserZodSchema } from './user.validation'


const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const zodValidation = UserZodSchema.parse(user)
    const result = await userService.createUserToDB(zodValidation)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: error,
    })
  }
}

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB()
    res.status(200).json({
      success: true,
      message: 'Users retrieve successfully',
      data: result,
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: error,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userService.getSingleUserFromDB(userId)

    res.status(200).json({
      success: true,
      message: 'User retrieve successfully',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not found',
      error: error,
    })
  }
}

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const result = await userService.updateSingleUser(user)
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(200).json({
      success: true,
      message: error.message || 'Something went wrong',
      data: error,
    })
  }
}

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userService.deleteSingleUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not deleted',
      error: error,
    })
  }
}

const addProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const { productName, price, quantity } = req.body
    const result = await userService.addProductToOrder(userId, {
      productName,
      price,
      quantity,
    })

    res.status(200).json({
      success: true,
      message: 'Product added successfully',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not deleted',
      error: error,
    })
  }
}






const getOrdersForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.getAllOrdersForUser(userId);
 
    res.status(200).json({
      success: true,
      message: 'Order retrieve successfully',
      data: result,
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not deleted',
      error: error,
    })
  }
};



const getTotalPriceForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.calculateTotalPriceForUser(userId);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.status(200).json({
      success: true,
      message: 'Order retrieve successfully',
      data: result,
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not deleted',
      error: error,
    })
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  addProduct,
  getOrdersForUser,
  getTotalPriceForUser
}