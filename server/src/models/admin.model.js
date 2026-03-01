import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username cannot exceed 20 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Only Gmail addresses (@gmail.com) are allowed",
    ],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },

  role: {
    type: String,
    enum: ["admin"],
    required: [true, "Role is required"],
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

export const Admin = mongoose.model("Admin", adminSchema);