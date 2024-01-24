import mongoose, {Schema} from "mongoose";

const UserSchema = mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        username: {
            type : String,
            required : true,
            unique : true
        },
        email: {
            type : String,
            required : true,
            unique : true
        },
        password: {
            type : String,
            required : true
        },
        profileImage: {
            type : String,
            required : false,
            default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        },
        isAdmin: {
            type : Boolean,
            default : false
        },
        roles: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: "Role"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", UserSchema);