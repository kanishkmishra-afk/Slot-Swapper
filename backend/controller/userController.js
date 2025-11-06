import { genToken } from "../config/token.js"
import { User } from "../models/usermodel.js"

export const registerUser=async(req,res)=>{

    try {
        const {name,email,password}=req.body
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exist"})
    }

        const user=await User.create({
            name,
            email,
            password
        })

        const token= await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

        res.status(201).json(user)

    } catch (error) {
        console.log("registerUser ERROR::",error);
        
    }
}

export const login =async(req,res)=>{
    try {
        const {email,password}=req.body
        const existUser = await User.findOne({email})
        if(!existUser){
            return res.status(400).json({message:"User does't exist"})
        }

        const match= password===existUser.password
        if(!match){
            return res.status(400).json("password in incorrect")
        }

        const token= await genToken(existUser._id)

        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json(existUser)

    } catch (error) {
        console.log("login ERROR::",error);
        
    }
}