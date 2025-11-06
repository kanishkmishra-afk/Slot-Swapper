import jwt from 'jsonwebtoken'

export const genToken=async(userId)=>{
    try {
        const token= await jwt.sign({userId},process.env.TOKEN_SECRET,{expiresIn:"7d"})
        return token
    } catch (error) {
        console.log("token Error");
        
    }
}