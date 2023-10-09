import express from 'express';
import { deleteVideos, getAllVideos, getVideo, postVideo, updateVideo } from '../controllers/videoCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';
const  videoRouter = express.Router();

videoRouter.post('/',authMiddleware,postVideo);
videoRouter.get('/:slug',authMiddleware,isAdmin,getVideo);
videoRouter.get('/',authMiddleware,getAllVideos);
videoRouter.put('/:id',authMiddleware,isAdmin,updateVideo);
videoRouter.delete('/:id',authMiddleware,isAdmin,deleteVideos);

export default videoRouter;