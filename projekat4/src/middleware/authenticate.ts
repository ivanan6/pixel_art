import {NextFunction, Request, Response} from "express"
import { createAPIError } from "../utils/createAPIError";
import jwt from "jsonwebtoken";

const jwt_secret = process.env.ACCESS_TOKEN_SECRET;

const authenticate = (req:Request,res:Response,next:NextFunction)=>{
    const header = req.headers.authorization;
    if(!header|| !header.startsWith("Bearer ")){
        return next(createAPIError("NOT_AUTHENTICATED",null,401))
    }
    const token = header.split(" ")[1];

    try {
        // jwt.verify(token,jwt_secret,(err,user)=>{
        //     if(err) return next(createAPIError("NOT_AUTHENTICATED",null,401));
        //     req.user =user;
        //     next()
        // })
        
        const dec = jwt.verify(token,jwt_secret);
        req.user=dec
        // req.user = {
        //     userId: dec.userId,  // Pretpostavljamo da je userId deo dekodiranog tokena
        //     username: dec.username,
        //   };
        next()
    } catch {
        return next(createAPIError("NOT_AUTHENTICATED", null, 401));
    }
}
export default authenticate

