import express from 'express';
import { subscribe, unSubscribe } from '../controllers/newsLetterCtrl.js';

const newsLetterRouter = express.Router();

newsLetterRouter.post('/',subscribe)
newsLetterRouter.delete('/:id', unSubscribe);

export default newsLetterRouter;