import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

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
            required: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: String,
            default: "user",
        },
        profession: {
            type: String,
            required: true,
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
    const salt = await  bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password) ;
}

//Export the model
const User = mongoose.model("User", userSchema);
export default User;
