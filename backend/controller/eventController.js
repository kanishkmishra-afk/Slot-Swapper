import mongoose from "mongoose";
import { Event } from "../models/eventmodel.js"
import { SwapRequest } from "../models/swapRequestmodel.js";

export const registerEvent=async(req,res)=>{
    try {
        const {title,startTime,endTime,status}=req.body
        const userId=req.userId

        const event= await Event.create({
            title,
            startTime,
            endTime,
            status,
            owner:userId
        })

        return res.status(201).json(event)
    } catch (error) {
        console.log("register Event ERROR::",error);
        
    }
}

export const getswappableSlots=async(req,res)=>{
    try {
         const swappableSlot= await Event.aggregate([
            {
                $match:{status:"SWAPPABLE"}
            },
            {
                $lookup:{
                    from:"users",
                    localField:"owner",
                    foreignField:"_id",
                    as:"userDetails"
                }
            },
            {
                $project:{
                    title:1,
                    status:1,
                    startTime:1,
                    endTime:1,
                    "userDetails.name":1
                }
            }

         ])

         return res.status(200).json(swappableSlot)
    } catch (error) {
        console.log("Swappapble Slot ERROR ::",error);
        
    }
}

export const swapRequest=async(req,res)=>{
    try {
        const {requesterEventId,targetEventId}=req.body
        const eventA= await Event.findById(requesterEventId)
        const eventB= await Event.findById(targetEventId)

        if(!(eventA.status==="SWAPPABLE" && eventB.status==="SWAPPABLE")){
            return res.status(400).json("badRequest")
        }

        await SwapRequest.create({
            requesterEventId,
            targetEventId,
            requesterId:eventA.owner,
            targetUserId:eventB.owner,
            status:"pending"
        })

        await Event.findByIdAndUpdate(eventA._id,{status:"SWAP_PENDING"},{new:true})
        await Event.findByIdAndUpdate(eventB._id,{status:"SWAP_PENDING"},{new:true})

        res.status(201).json("request sent successfully")

    } catch (error) {
        console.log("swap Request ERROR :: ",error);
        
    }
}

export const swapResponse=async(req,res)=>{
    try {
        const {decision}=req.body
        const requestId=req.params.id

        const swapReq=await SwapRequest.findById(requestId)
        const eventA= await Event.findById(swapReq.requesterEventId)
        const eventB= await Event.findById(swapReq.targetEventId)
        if(decision==="false"){
            swapReq.status="rejected"
            await swapReq.save({validateBeforeSave:false})
            await Event.findByIdAndUpdate(eventA._id,{status:"SWAPPABLE"},{new:true})
            await Event.findByIdAndUpdate(eventB._id,{status:"SWAPPABLE"},{new:true})
            return res.status(200).json({message:"swap Rejected"})
        }else if(decision==="true"){
            swapReq.status="accepted"
            await swapReq.save({validateBeforeSave:false})
            const temp=eventA.owner
            await Event.findByIdAndUpdate(eventA._id,{owner:eventB.owner,status:"BUSY"},{new:true})
            await Event.findByIdAndUpdate(eventB._id,{owner:temp,status:"BUSY"},{new:true})
            return res.status(200).json({message:"swap accepted"})
        }

        
    } catch (error) {
        console.log("swap Response ERROR::",error);
        
    }
}

export const getSwapRequest=async(req,res)=>{
    try {
        const userId=req.user

        const requests=await SwapRequest.find({targetUserId:userId})

        res.status(201).json(requests)
    } catch (error) {
        console.log("getSwapRequest ERROR::",error);
        
    }
}


