import { Task } from "../model/task.models.js"

const createTask = async (req,res)=> {
    const {title} = req.body
    const {_id} = req.user 

    if(!title){
        return res.status(400).json({message : "please provide the title for task"})
    }
    const createTask = await Task.create({
        title: title,
        userId : _id
        // curently all task completed is false this will got true after complte with update task
    })
    if (!createTask) {
        return res.status(501).json({message: "failed to create task"})
    }
    return res.status(200).json({data: createTask , message : "task created"})
}

const updateTask = async(req,res)=> {
    const {id} = req.params
    const {title,completed} = req.body

    if (title === undefined || completed === undefined) {
        return res.status(400).json({message: "please provide title and completed status to update"})
    }
    const updatetask= await Task.findByIdAndUpdate(id,{
        title: title,
        completed: completed
    },{
        new: true
    })
    if (!updatetask) {
        return res.status(501).json({message: "failed to update task"})
    }
    return res.status(200).json({data : updateTask,messsage: "task updated"})
}

const allTask = async(req,res)=> {

    const alltask = await Task.find({})
    if (alltask.length === 0) {
        return res.status(404).json({message: "curently no task is available"})
    }
    return res.status(200).json({data: alltask,message: "all task fatched"})
}

const userAllTak =async(req,res)=> {
    const {_id}= req.user
    const alltask = await Task.find({userId : _id})
    if (alltask.length == 0) {
        return res.status(404).json({message: "curently no task is available"})
    }
    return res.status(200).json({data: alltask,message: "user all task fatched"})
}

export {
    userAllTak,
    allTask,
    createTask,
    updateTask
}