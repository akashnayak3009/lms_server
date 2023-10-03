import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDb from './config/db.js';
import { handleError, notFound } from './middleware/errorHandler.js';
import userRouter from './routes/userRoutes.js';
import bodyParser from 'body-parser';

dotenv.config();

//connection to MONGODB database
connectDb();

const app =express();
app.use(express.json());

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use('/api/user',userRouter)


//Error handling routes
app.use(notFound);
app.use(handleError)

//Connection To server 
const port= process.env.PORT || 6000     //Alternate port
app.listen(port, ()=>{
    console.log(`Server is connected and  mode at http://localhost:${port}`.yellow.bold)  ;
});