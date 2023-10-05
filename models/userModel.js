import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import crypto from 'crypto'

let userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        user_image: {
            type: String,
            default:
                "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        mobile: {
            type: String,
            unique: true,
            index: true,
        },
        password: {
            type: String,
        },
        roles: {
            type: String,
            default: "user",
        },
        profession: {
            type: String,
        },
        isblocked: {
            type: Boolean,
            default: false,
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        stripe_account_id: String,
        stripe_seller: {},
        stripSession: {},
    },
    {
        timestamps: true,
    }
);


//Encrypting the password
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await  bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password) ;
}

//Generate the token for reset password
userSchema.methods.createPasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 30*60*1000;   //10 min
    return resetToken;
}

//Export the model
const User = mongoose.model("User", userSchema);
export default User;