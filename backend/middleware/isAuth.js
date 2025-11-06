import jwt from 'jsonwebtoken';

export const isAuth=(req,res,next)=>{
    try {
        let {token}=req.cookies
        if(!token){
            return res.status(400).json({message:"user does not have a token"})
        }

        const verifyToken = jwt.verify(token,process.env.TOKEN_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"user does not have a valid token"})
        }

        req.userId=verifyToken.userId
        next()
    } catch (error) {
        console.log("is Auth ERROR::",error);
        return res.status(500).json({message:"is Auth ERROR"})
    }
}