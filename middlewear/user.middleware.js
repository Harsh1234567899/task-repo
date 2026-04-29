import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js"

export const verifyJWT = async (req,res,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            return res.status(401).json({message: "Unautorized access"})
        }
        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
        if (!user) {
            return res.status(401).json({message: "toekn invalid try block"})
        }
    
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({message: "toekn invalid catch block",error : error})
    }

}