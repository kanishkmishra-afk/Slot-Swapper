import mongoose from "mongoose";

const swapRequestSchema= new mongoose.Schema({
    requesterEventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    targetEventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
        required:true
    },
    requesterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    targetUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }
},{timestamps:true})

export const SwapRequest=mongoose.model("SwapRequest",swapRequestSchema)