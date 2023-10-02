import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDb from './db/db.js';

dotenv.config();
connectDb();

const app =express();

app.use(express.json());


const port= process.env.PORT
app.listen(port, ()=>{
    console.log(`Server is connected and  mode at http://localhost:${port}`.yellow.bold)  ;
});