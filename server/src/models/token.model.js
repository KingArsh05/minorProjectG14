import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Active", "Expired"],
    default: "Active",
  },
  limitsLeft: {
    type: Number,
    default: 1,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: "0" },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

tokenSchema.pre("save", async function (next) {
  if (!this.isModified("token")) return next();
  this.token = await bcrypt.hash(this.token, 12);
  next();
});

tokenSchema.methods.compareToken = async function (userToken) {
  return await bcrypt.compare(userToken, this.token);
};

export const Token = mongoose.model("Token", tokenSchema);
