import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type : Boolean,
        default: false
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timeStampe: true})

export const Task = mongoose.model("Task",taskSchema)