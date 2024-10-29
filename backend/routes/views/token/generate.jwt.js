import jwt from 'jsonwebtoken';
export const generateToken=async(res,userID,next)=>{
    try {
        const jwt_token = jwt.sign({id:userID}, process.env.SECRET_KEY, { expiresIn: '1hr' });
        res.cookie('token', jwt_token, { httpOnly: true, secure:true, maxAge: 60 * 60 * 1000});
    } catch (error) {
        const err = new Error(error.message || "cookie not set properlly");
        err.status = 500;
        next(err);
    }
}