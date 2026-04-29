import { User } from "../model/user.model.js"

const registerUser = async (req, res) => {
    try {
        const { email, password, name } = req.body
        if (!email || !password || !name) {
            return res.status(400).json({ message: "please enter email and password name" })
        }
        const existingUser = await User.findOne({ email }).select("-password")
        console.log(existingUser);
        
        if (existingUser) {
            return res.status(202).json({ message: `user with this ${email} email already exist` })
        }
        const user = await User.create({
            email: email,
            password: password,
            name: name
        })
        if (!user) {
            return res.status(500).json({ message: "failed to create user please try after some time" })
        }
        const newUser = user.toObject()
        delete newUser.password
        return res.status(200).json({ data: newUser, message: "user created " })
    } catch (error) {
        return res.status(501).json({ message: "server is busy please try again after some time" })
    }
}

const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find({}).select("-passwrod")
        if (allUser.length == 0) {
            return res.status(404).json({ message: "no user found" })
        }
        return res.status(200).json({ data: allUser, message: "all user fathced" })
    } catch (error) {
        return res.status(501).json({ message: "server is busy please try again after some time" })

    }
}

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const giveUserToken = await User.findById(userId)
        const accessToken = giveUserToken.generateAccessToken()
        const refreshToken = giveUserToken.generateRefreshToken()

        giveUserToken.refreshToken = refreshToken  
        await giveUserToken.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error);
        
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(300).json({ message: "please enter email and password " })
        }
        const existingUser = await User.findOne({email}).select("+password")
        
        if (!existingUser) {
            return res.status(404).json({message: "user not found"})
        }
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(existingUser._id)
        const loggedInUser = await User.findById(existingUser._id).select("-password -refreshToken")
                // console.log(loggedInUser);

        if (!loggedInUser) {
            return res.status(501).json({message: "failed to login"})
        }
        return res.status(200).cookie("accessToken", accessToken).cookie("refreshToken", refreshToken).json({data:{user: loggedInUser,accessToken : accessToken,refreshToken: refreshToken},message: "user logged in"})
    } catch (error) {
        return res.status(501).json({ message: "server is busy please try again after some time" })

    }
}

export {
    getAllUser,
    registerUser,
    login
}