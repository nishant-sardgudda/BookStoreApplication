import User from "../models/User.js"
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";

//Method to get all the users from DB
export const getAllUsers = async(req, res, next) =>{
    try {
        const users = await User.find();
        if(!users){
            return next(createError(500, "Something Went Wrong!"));
        }
        return next(createSuccess(200, "Users found!", users));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}

//Method to get one user by id from DB
export const getUserById = async(req, res, next) =>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(createError(404, "User Not Found!"));
        }
        return next(createSuccess(200, "User found!", user));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
}