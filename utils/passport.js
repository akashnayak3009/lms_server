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
passport.use(new GoogleStrategy(
    {
        clientID:process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
    },
    async function(accessToken, refreshToken, profile, done) {
        try {
            // Check if the user already exists in your database
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                // If the user does not exist, create a new user using the Google profile data
                user = new User({
                    googleId: profile.id,
                    // You can also save other user data here based on the Google profile
                });
                await user.save();
            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));


// passport.serializeUser((user,done)=>{
//     done(null,user);
// })

// passport.deserializeUser((user,done)=>{
//     done(null,user);
// })

passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize the user's ID into the session
});

passport.deserializeUser(async (id, done) => {
    try {
        // Retrieve the user from the database by ID
        const user = await User.findById(id);
        done(null, user); // Deserialize the user from the session
    } catch (err) {
        done(err, null);
    }
});
export default passport ;