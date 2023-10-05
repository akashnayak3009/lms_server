import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/db.js";
import { handleError, notFound } from "./middleware/errorHandler.js";
import userRouter from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "./utils/passport.js";
import googleRouter from "./routes/googleRoutes.js";


const app = express();
app.use(express.json());


dotenv.config();

//connection to MONGODB database
connectDb();
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "mysecret",
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            ttl: 12 * 60 * 60,
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());


//bodyParser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.get('/',(req,res)=>{
    res.send(`<a href="http://localhost:5000/google"> Login with Google </a>`)
})

app.use("/api/user", userRouter);
app.use('/',googleRouter)

//Error handling routes
app.use(notFound);
app.use(handleError);

//Connection To server
const port = process.env.PORT || 6000; //Alternate port
app.listen(port, () => {
    console.log(
        `Server is connected and  mode at http://localhost:${port}`.yellow.bold
    );
});

