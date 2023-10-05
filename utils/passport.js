import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
import User from '../models/userModel.js';

// passport.use(new GoogleStrategy(
//     {
//         clientID: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         callbackURL: "/auth/google/callback",
//         scope:["profile", "email"],
//     },
//     async function(profile, done){
//         console.log(profile);
//         return done(null, user);
//     }
// ));

passport.serializeUser((user, done) => {
    done(null, user); // Serialize the user's ID into the session
});

passport.deserializeUser( (user, done) => {
        done( null, user);
});
passport.use(new GoogleStrategy(
    {
        clientID:'844591788828-ja50gp59vrlge6ae2f6rliu19h9oe5k9.apps.googleusercontent.com',  //process.env.CLIENT_ID,
        clientSecret:'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',    // process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
        scope: ["profile", "email"],
    },
    async function(accessToken, refreshToken, profile, cb) {
       let data = profile?._json;
       const user = await User.findOne({email:data.email});
       if(user) {
         return await cb(null, user);
       }else{
        const newUser = await User.create({
            firstname: data.name,
            lastname: data.given_name,
            user_image:data.picture,
            email:data.email,
            roles: "user",
        });
        return await cb(null, newUser);
       }
    }
));


// passport.serializeUser((user,done)=>{
//     done(null,user);
// })

// passport.deserializeUser((user,done)=>{
//     done(null,user);
// })



export default passport 