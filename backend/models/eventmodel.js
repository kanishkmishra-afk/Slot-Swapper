import mongoose from "mongoose";

const eventSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["BUSY","SWAPPABLE","SWAP_PENDING"]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

export const Event=mongoose.model("Event",eventSchema)