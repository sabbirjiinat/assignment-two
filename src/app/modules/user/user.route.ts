import express from 'express'
import { userController } from './user.controller'
const router = express.Router()

router.post('/', userController.createUser)
router.get('/', userController.getAllUser)
router.get('/:userId', userController.getSingleUser)
router.put('/:userId', userController.updateSingleUser)
router.delete('/:userId', userController.deleteSingleUser)
router.put('/:userId/orders', userController.addProduct)
router.get('/:userId/orders', userController.getOrdersForUser);
router.get('/:userId/orders/total-price', userController.getTotalPriceForUser);

export const userRoute = router
