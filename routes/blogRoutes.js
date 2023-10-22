import express from 'express';
import { deleteBlogs, getAllBlogs, getBlog, postBlog, updateBlog } from '../controllers/blogCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';
const  blogRouter = express.Router();

blogRouter.post('/',authMiddleware,postBlog);
blogRouter.get('/:slug',authMiddleware,isAdmin,getBlog);
blogRouter.get('/',authMiddleware,getAllBlogs);
blogRouter.put('/:id',authMiddleware,isAdmin,updateBlog);
blogRouter.delete('/:id',authMiddleware,isAdmin,deleteBlogs);

export default blogRouter;