import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        uniqe: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
},{timeStampe : true})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        name: this.name,
        email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    } 
)
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User = mongoose.model("User",userSchema)

