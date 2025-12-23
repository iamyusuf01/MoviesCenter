import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//User Registration
export const registerUser = async (req, res) => {
  //fetchin the data from request body
  try {
    const { name, email, password } = req.body;
    //check Validation
    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }
    //check User Exists aur Not
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.json({
        success: false,
        message: "Email already exists",
      });
    }
    // Protect Password Using Bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    //Create User in DataBase
    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    const createUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createUser) {
      return res.json({
        success: false,
        message: "Something went wrong while registering the user",
      });
    }

    // return Success response
    return res.json({
      success: true,
      message: "User register successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const generateAccessTokenAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return "User not found";
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save({ ValidityBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookie.refreshAccessToken || req.body.refreshAccessToken;

    if (!incomingRefreshToken) {
      return res.json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const tokenDecode = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(tokenDecode?._id);
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res.json({
        success: false,
        message: "Refresh token is expired or used",
      });
    }
    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessTokenAndRefreshTokens(user._id);
    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshTokenToken, options)
      .json({
        success: true,
        message: "Access token refreshed",
        accessToken,
        refreshToken: newRefreshToken,
      });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//User Login
export const login = async (req, res) => {
  //fetching user from req body
  try {
    const { email, password } = req.body;
    //check validation
    if (!email || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    //
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect password",
      });
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "User login successfully",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//LogOut
export const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user?.id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "User logout successfully",
      });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//chnage-password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;

    await user.save();

    return res.json({
      success: true,
      message: "Reset password succcessfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


//Authenticate
export const isAuthenticate = async (req, res) => {
  try {
    return res.json({
      success: true,
      message: "User is authenticated",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!req.user?._id || !role) {
      return res.json({
        success: false,
        message: "UserId and role are required",
      });
    }

    if (!["user", "admin", "seller"].includes(role)) {
      return res.json({
        success: false,
        message: "Invalid role",
      });
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
      {role},
      {new: true}
    ).select("-password");

    if(!user){
      return res.json({
        success: false,
        message: "User not found"
      })
    }

    return res.json({
      success: true,
      message: "Role updated succesfully",
      user
    })
  } catch (error) {}
};