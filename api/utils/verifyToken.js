import jwtToken from "jsonwebtoken";
import { createError } from "./error.js";

//Verifying the token
export const verifyToken = (req, res, next) =>{
    try {
        const token = req.cookies.access_token;
        console.log("token value: ",token.trim());
        if(token.trim() === null || token.trim() === ''){
            return next(createError(401, "You are not authorized!"));
        }
        jwtToken.verify(token, process.env.JWT_SECRET_KEY, (err, user) =>{
            if(err){
                return next(createError(403, "Token is not valid!"));
            }
            req.user = user;
            next();
        })
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
};

//Verify the user
export const verifyUser = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    })
};

//Verify the admin user
export const verifyAdmin = (req, res, next) =>{
    verifyToken(req, res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    })
};