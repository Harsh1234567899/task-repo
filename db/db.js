import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/task1`)
        console.log("db connect");
        
    } catch (error) {
        console.log("faild to connect db error => ",error);
        
    }
}

export {connectDB}