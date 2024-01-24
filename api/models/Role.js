import mongoose from "mongoose";

const RoleSchema = mongoose.Schema(
    {
        role: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Role", RoleSchema);