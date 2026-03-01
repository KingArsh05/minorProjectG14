import { Admin } from "../models/admin.model.js";
import { Session } from "../models/session.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  signed: true,
  path: "/",
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  ...(isProduction && { partitioned: true }),
};

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingSid = req.signedCookies?.sid;

  if (existingSid) {
    await Session.findByIdAndDelete(existingSid);
    res.clearCookie("sid", cookieOptions);
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const isPasswordValid = await admin.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const session = await Session.create({ adminId: admin._id });
  res.cookie("sid", session.id, {
    ...cookieOptions,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  const { _id, name, email: adminEmail } = admin;
  return res
    .status(200)
    .json(
      new ApiResponse({ _id, name, email: adminEmail }, "Login Successful!"),
    );
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  const { sid } = req.signedCookies;
  if (!sid) {
    throw new ApiError(401, "Not authenticated");
  }

  await Session.findByIdAndDelete(sid);
  res.clearCookie("sid", cookieOptions);

  return res.status(200).json(new ApiResponse(null, "Logged out successfully"));
});

export const getProfile = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.admin;
  return res.status(200).json(new ApiResponse({ _id, name, email }));
});
