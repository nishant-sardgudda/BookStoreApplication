import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwttoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";
import UserToken from "../models/UserToken.js";

//Registering User
export const registerUser = async(req, res, next) =>{
    try {
        const role = await Role.find({role : 'User'});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            username : req.body.userName,
            email : req.body.email,
            password : hashPassword,
            roles : role
        });
        await newUser.save();
        return next(createSuccess(200, "User registered successfully!"));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
};

//Registering Admin User
export const registerAdmin = async(req, res, next) =>{
    try {
        const role = await Role.find({});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            username : req.body.userName,
            email : req.body.email,
            password : hashPassword,
            isAdmin : true,
            roles : role
        });
        console.log('newUser' , newUser);
        await newUser.save();
        return next(createSuccess(200, "Admin User registered successfully!"));
    } catch (error) {
        return next(createError(500, "Internal Server Error!"));
    }
};

export const login = async(req, res, next)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        .populate("roles","role"); //.populate() method from mongoose

        //destructuring the role from user
        const { roles } = user;

        if(!user){
            return next(createError(404, "user not found!"));
        }
        const isPwdMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isPwdMatch){
            return next(createError(400, "Password is wrong!"));
        }
        const token = jwttoken.sign(
            {id: user._id, isAdmin : user.isAdmin, role : roles},
            process.env.JWT_SECRET_KEY
        );
        res.cookie("access_token" , token , {httpOnly : true, secure : true}).status(200).json(
            {
                status : 200,
                message : "Login Success!",
                data : user
            }
        );
        //return next(createSuccess(200, "User logged in successfully!"));
    } catch (error) {
        return next(createError(500, "Something went wrong!"));
    }
}

export const sendEmail = async(req, res, next) =>{
    try {
        const email = req.body.email;
        const user = await User.findOne({email : {$regex : '^' + email + '$', $options : 'i'}});
        if(!user){
            console.log("User not found to reset the Email!");
            return next(createError(404, "User not found to reset the Email!"));
        }
        const payload = {
            email : user.email
        }
        const userId = user._id;
        const expiryTime = 300;
        const token = jwttoken.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn : expiryTime});
        const newToken = new UserToken({
            userId : userId,
            token : token
        });

        const emailTransorter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : "snishant123456@gmail.com",
                pass : "ccmeplcsyzopvynq"
            }
        });
        let emailDetails = {
            from : "snishant123456@gmail.com",
            to : email,
            subject : "Reset Password",
            html : `
            <html>
            <head>
                <title> Password Reset Request!</title>
            </head>
            <body>
                <h1> Password Reset request </h1>
                <p>Dear ${user.firstName + ' ' + user.lastName}, </p>
                <p>We have received a request to reset password for your account with BookMyBook. To complete the password reset process, 
                please click on the button below: </p>
                <a href = ${process.env.LIVE_URL}/reset/${token}><button style="background:color: #4CAF50D; color: white; padding: 14px 20 px; border: none; cursor: pointer;
                border-radius: 4px">Reset Password</button> 
                <p>Please not this link is only valid for 5 mins. If you did not raised password reset reqest, please disregard this message. </p>
                <p>Thank you, </p>
                <p>BookMYBook Team</p>
            </body>
            </html>
            `
        }
        emailTransorter.sendMail(emailDetails, async(err, info)=>{
            if(err){
                console.log(err);
                return next(createError(500, "Something went wrong while sending reset email!"));
            }else{
                await newToken.save();
                return next(createSuccess(200, "Reset mail sent successfully!"));
            }
        })

    } catch (error) {
        return next(createError(500, "Something went wrong while sending email2!"));
    }
}

export const resetPassword = (req, res, next)=>{
    const token = req.body.token;
    const updatedPassword = req.body.password;

    jwttoken.verify(token, process.env.JWT_SECRET_KEY, async(err, data)=>{
        if(err){
            return next(createError(500, "Reset Password link is expired!"));
        }else{
            const response = data;
            const user = await User.findOne({email : {$regex : '^'+response.email+'$', $options : 'i'}});
            try {
                if(user){
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(updatedPassword, salt);
                    user.password = hashPassword;
                    const updatedUser = await User.findOneAndUpdate(
                        {_id : user._id},
                        {$set : user},
                        {new : true}
                    );
                    return next(createSuccess(200, 'Password Reset Successfully!', response.email));
                }
            } catch (error) {
                return next(createError(500, 'Something went wrong while resetting password!'));
            }
        }
    })

}

export const successEmail = async(req, res, next)=>{
    try {
        const value = req.body.message;
        const email = req.body.email;
        const user = await User.findOne({email : {$regex : '^' + email + '$', $options : 'i'}});
        if(!user){
            return next(createError(404, "User not found to send success email!"));
        }
        const emailTransorter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : "snishant123456@gmail.com",
                pass : "ccmeplcsyzopvynq"
            }
        });
        
        if(value === 'Register'){
            const emailDetails = {
                from : "snishant123456@gmail.com",
                to : email,
                subject : "Registeration Successful",
                html : `
                <html>
                <head>
                    <title> Registeration to BookMyBook Successful!</title>
                </head>
                <body>
                    <h1> Account Creation: </h1>
                    <p>Dear ${user.firstName + ' ' + user.lastName}, </p>
                    <p>This is to notify that your registeration to BookMyBook is successful! </p>
                    <p>Keep shopping with BookMyBook. </p>
                    <p>Thank you, </p>
                    <p>BookMYBook Team</p>
                </body>
                </html>
                `
            }
            emailTransorter.sendMail(emailDetails, async(err, info)=>{
                if(err){
                    console.log(err);
                    return next(createError(500, "Something went wrong while sending registeration email!"));
                }else{
                    return next(createSuccess(200, "Registeration mail sent successfully!"));
                }
            })
        }
        else if(value === 'Reset-Password'){
            const emailDetails = {
                from : "snishant123456@gmail.com",
                to : email,
                subject : "Password Reset Successful",
                html : `
                <html>
                <head>
                    <title> Password Reset of BookMyBook is Successful!</title>
                </head>
                <body>
                    <h1> Password Reset: </h1>
                    <p>Dear ${user.firstName + ' ' + user.lastName}, </p>
                    <p>This is to notify that your password of BookMyBook is successfully updated! </p>
                    <p>If not done by you, report us immediately! </p>
                    <p>Thank you, </p>
                    <p>BookMYBook Team</p>
                </body>
                </html>
                `
            }
            emailTransorter.sendMail(emailDetails, async(err, info)=>{
                if(err){
                    console.log(err);
                    return next(createError(500, "Something went wrong while sending sucess password reset email!"));
                }else{
                    return next(createSuccess(200, "Reset password success mail sent successfully!", email));
                }
            })
        }

        
    } catch (error) {
        return next(createError(500, 'Something went wrong while sending success emails!'));
    }
}