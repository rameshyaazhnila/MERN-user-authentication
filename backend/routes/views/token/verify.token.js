import jwt from 'jsonwebtoken';
export const verifyToken=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({isLoggedin:false,message:"invalid tokenss"})
    }
    try {
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        if(!decoded){
            return res.status(401).json({isLoggedin:false,message:"token expired"})
        }
        req.userId=decoded.id
        next()
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({ isLoggedin: false, message: "Invalid or expired token" });
    }
}