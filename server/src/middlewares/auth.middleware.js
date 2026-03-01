import { Admin } from "../models/admin.model.js";
import { Session } from "../models/session.model.js";
import { ApiError } from "../utils/ApiError.js";

export const checkAuth = async (req, res, next) => {
  try {
    const { sid } = req.signedCookies;

    if (!sid) {
      throw new ApiError(401, "Not logged in");
    }

    const session = await Session.findById(sid);
    if (!session) {
      res.clearCookie("sid", {
        httpOnly: true,
        signed: true,
        sameSite: "none",
        secure: true,
        path: "/",
      });

      throw new ApiError(401, "Session expired or invalid");
    }

    const admin = await Admin.findById(session.adminId).lean();

    if (!admin) {
      res.clearCookie("sid", {
        httpOnly: true,
        signed: true,
        sameSite: "none",
        secure: true,
        path: "/",
      });
      throw new ApiError(401, "User not found");
    }

    req.admin = admin;

    return next();
  } catch (error) {
    return next(error);
  }
};
