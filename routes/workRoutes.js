import express from 'express'
import {authMiddleware, isAdmin} from '../middleware/authMiddleware.js'
import { deleteDetails, getAllDetail, getDetail, postDetails, updateDetails } from '../controllers/workCtrl.js';


const workRouter = express.Router();

workRouter.post('/', authMiddleware,isAdmin,postDetails)
workRouter.put('/:id', authMiddleware,isAdmin,updateDetails)
workRouter.delete('/:id', authMiddleware,isAdmin,deleteDetails)
workRouter.get('/:id', authMiddleware,isAdmin,getDetail)
workRouter.get('/', authMiddleware,isAdmin,getAllDetail)

export default workRouter;