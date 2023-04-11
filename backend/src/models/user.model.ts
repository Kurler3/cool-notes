import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // UNIQUE
    },
    email: {
        type: String,
        unique: true, // UNIQUE
        required: true,
        select: false, // WILL NOT RETURN THE EMAIL IF NOT ASKING IMPLICITLY FOR IT
    },
    password: {
        type: String,
        required: true,
        select: false, // SAME FOR PASSWORD
    },
}, {
    timestamps: true,
});

export type IUser = InferSchemaType<typeof userSchema>;

userSchema.pre("save", async function(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next: any
) {

    // INIT USER AS USER DOCUMENT
    const user = this as HydratedDocument<IUser>;

     // IF NOT MODIFYING THE PASSWORD => SKIP
     if(!user.isModified('password')) {
         return next();
     }
 
     // CREATE SALT
     const salt = await bcrypt.genSalt(10);
 
     // HASH
     const hash = await bcrypt.hash(user.password, salt);
 
     // REPLACE PWD
     user.password = hash;
 
     // NEXT
     return next();

});

// ADD A METHOD TO COMPARE PASSWORD
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {

    const user = this as HydratedDocument<IUser>;

    return await bcrypt.compare(candidatePassword, user.password).catch((e: unknown) => {
        console.error(e);
        return false;
    });
}

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;