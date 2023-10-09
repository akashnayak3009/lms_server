import express from 'express';
import { deleteDocuments, getAllDocuments, getDocument, postDocument, updateDocument } from '../controllers/docsCtrl.js';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware.js';
const  documentRouter = express.Router();

documentRouter.post('/',authMiddleware,postDocument);
documentRouter.get('/:slug',authMiddleware,isAdmin,getDocument);
documentRouter.get('/',authMiddleware,getAllDocuments);
documentRouter.put('/:id',authMiddleware,isAdmin,updateDocument);
documentRouter.delete('/:id',authMiddleware,isAdmin,deleteDocuments);

export default documentRouter;