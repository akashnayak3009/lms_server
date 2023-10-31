import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from 'cors';
import connectDb from "./config/db.js";
import { handleError, notFound } from "./middleware/errorHandler.js";
import userRouter from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "./utils/passport.js";
import googleRouter from "./routes/googleRoutes.js";
import tutCatRouter from "./routes/tutCatRoutes.js";
import tutorialRouter from "./routes/tutorialRoutes.js";
import newsLetterRouter from "./routes/newsLetterRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import videoRouter from "./routes/videoRoutes.js";
import documentRouter from "./routes/documentationRoutes.js";
import docCatRouter from "./routes/docCatRoutes.js";
import blogCatRouter from "./routes/blogCatRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import videoCatRouter from "./routes/videoCatRoutes.js";
import courseCatRouter from "./routes/courseCatRoutes.js";
import courseRouter from "./routes/courseRoutes.js";
import rateLimit from "express-rate-limit";
import rateLimitter from "./utils/reqLimit.js";
import workRouter from "./routes/workRoutes.js";
import projectCatRouter from "./routes/projectCatRoutes.js";
import projectRouter from "./routes/projectRoutes.js";


const app = express();
app.use(express.json());
app.use(cors());


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

//Route-rate-limiter
app.use('/api', rateLimitter())  // app.use('/api', rateLimitter(100000,'hours',50,'Too many Request please try again after some time'))

//Routers
app.use("/api/user", userRouter); 
app.use('/',googleRouter);
app.use("/api/tutorial/category",tutCatRouter);
app.use('/api/tutorial',tutorialRouter)
app.use('/api/newsLetter', newsLetterRouter);
app.use('/api/review', reviewRouter)
app.use('/api/contact', contactRouter)
app.use('/api/video', videoRouter);
app.use('/api/videoCat', videoCatRouter);
app.use('/api/document', documentRouter);
app.use('/api/docCat', docCatRouter);
app.use('/api/blogCat', blogCatRouter);
app.use('/api/blog',blogRouter);
app.use('/api/courseCat', courseCatRouter);
app.use('/api/course',courseRouter);
app.use('/api/work',workRouter)
app.use('/api/project',projectRouter)
app.use('/api/projectCat', projectCatRouter)

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

