import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String },
    avatarUrl: { type: String },
    name: { type: String, required: true },
    socialOnly: { type: Boolean, default: false },
    location: { type: String },
})
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 5);
});
const User = mongoose.model("User", userSchema);
export default User;