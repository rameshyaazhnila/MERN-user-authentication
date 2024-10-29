export const errorHandle=async(error,req,res,next)=>{
    if(!error.status){
        return res.status(500).json({error:"internal server error"})
    }
    res.status(500).json(error.message)
}