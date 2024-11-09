import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mail.js";
import crypto from "crypto";
import { DealerRequest } from "../models/dealerRequest.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get data from frontend
  // check is required is empty or not
  //check is user already registered
  //check for avatar
  //upload image to cloudinary server
  //create user in database
  //remove password and refresh token from response
  //check if user created or not
  // return response\

  const { username, email, fullName, password, role, address } = req.body;

  if (
    [username, email, fullName, password, role].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ username });

  if (existedUser) {
    throw new ApiError(400, "User with given username already exists");
  }

  const againcheck = await User.findOne({ email });
  if (againcheck) {
    throw new ApiError(400, "User with given email already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Please provide an avatar");
  }

  const avatar = await uploadonCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    username: username.toLowerCase(),
    email,
    password,
    role,
    address,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user");
  }
  const Sendemail = await sendMail({
    to: user.email,
    subject: "Welcome to ScrapMan - Registration Success",
    text: `Hello ${user.fullName},\n\nWelcome to ScrapMan! Your registration has been successfully completed. We're excited to have you on board and ready to start your journey with us.\n\nYou can now explore features like scrap pickups, view available scrap categories, and much more. Together, we’re making scrap management easier and more sustainable.\n\nIf you have any questions or need assistance, don’t hesitate to reach out to our support team.\n\nBest regards,\nThe ScrapMan Team`,
  });

  return res.status(201).json(
    new ApiResponse(
      200,
      {
        user: {
          ...createdUser.toObject(),
          password: undefined,
          refreshToken: undefined,
          role: createdUser.role,
        },
      },
      "User registered successfully"
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Request body data:", req.body);

  if (!username && !email) {
    throw new ApiError(400, "Please provide either username or email");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) throw new ApiError(401, "User not found");

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) throw new ApiError(401, "Password is incorrect");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  console.log("Generated Access Token:", accessToken);
  console.log("Generated Refresh Token:", refreshToken);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            ...user.toObject(),
            password: undefined,
            refreshToken: undefined,
            role: user.role,
          },
        },
        "User logged in successfully"
      )
    );

  console.log("Access and refresh tokens set as cookies.");
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true }
  );

  const isProduction = process.env.NODE_ENV === "production";
  const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshAccessToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "No refresh token provided");
  }

  const decodedRefreshToken = await jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  try {
    const user = await User.findById(decodedRefreshToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token has expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { newAccessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error.message || "invalid refresh token sir");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  //get user old and new password
  //check if user entered correct old password
  //update user password
  //return response

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Please enter old and new password");
  }

  const user = await User.findById(req.user?._id);

  if (!user) throw new ApiError(401, "User not found");

  const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isOldPasswordCorrect)
    throw new ApiError(401, "Old password entered is incorrect");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  const Sendemail = await sendMail({
    to: user.email,
    subject: "ScrapMan - Password Changed Successfully",
    text: `Hello ${user.fullName},\n\nYour password has been successfully changed on ScrapMan. If you didn't make this change, please contact our support team immediately.\n\nBest regards,\nThe ScrapMan Team`,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // Check if user is authenticated and req.user is available
  if (!req.user) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "User not authenticated"));
  }

  // If authenticated, respond with user details
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullName, email, address } = req.body;

  if ([fullName, email, address].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { fullName, email, address } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body); // Log the request body
  console.log("Request file:", req.file); // Log the uploaded file

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Please provide an avatar");
  }

  const avatar = await uploadonCloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar.url }, // Store the URL from Cloudinary
    { new: true, runValidators: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User avatar updated successfully"));
});

const askDealerRegistration = asyncHandler(async (req, res) => {
  const { fullName, email, avatar, address, contact } = req.body;
  if (
    [fullName, email, avatar, address, contact].some(
      (filed) => filed?.trim() == ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "Dealer with the same email already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Please provide an avatar");
  }

  const uploadonCloudinary = await uploadonCloudinary(avatarLocalPath);

  if (!updateUserAvatar) {
    throw new ApiError(400, "Error while uploading avatar");
  }

  const newRequest = await DealerRequest.create({
    fullName,
    email,
    avatar: uploadonCloudinary.url,
    address,
    contact,
    status: "pending",
  });

  if (!newRequest) {
    throw new ApiError(400, "Failed to create dealer request");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newRequest,
        "Dealer registration request submitted successfully"
      )
    );
});

const acceptDealerRegistration = asyncHandler(async (req, res) => {
  const requestId = req.body;

  if (!requestId) {
    throw new ApiError(400, "Request ID is required");
  }

  const request = await DealerRequest.findById(requestId);

  if (!request) {
    throw new ApiError(404, "Request not found");
  }

  if (request.status !== "pending") {
    throw new ApiError(400, "Request is not pending");
  }

  request.status = "accepted";

  const fullName = request.fullName;
  const email = request.email;
  const avatar = request.avatar;
  const address = request.address;
  const contact = request.contact;

  const username = `${fullName.toLowerCase().replace(/ /g, "")}${Math.floor(Math.random() * 10000)}`;
  const newPassword = crypto.randomBytes(8).toString("hex");

  const newUser = await User.create({
    username,
    newPassword,
    fullName,
    email,
    avatar,
    address,
    role: "dealer",
  });

  if (!newUser) {
    throw new ApiError(400, "Failed to create new dealer account");
  }

  const sendEmail = await sendMail({
    to: user.email,
    subject: "Welcome to ScrapMan - Dealer Registration Success",
    text: `Hello ${user.fullName},\n\nWelcome to ScrapMan! Your request to be a dealer in our family has been approved and  your dealer account has been successfully created. Below are your account details:\n\nUsername: ${username}\nPassword: ${randomPassword}\n\nPlease make sure to keep your password safe. If you need any assistance or have any questions, feel free to reach out to our support team.\n\nBest regards,\nThe ScrapMan Team`,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, newUser, "Dealer registration accepted successfully")
    );
});

const getdealerRequests = asyncHandler(async (req, res) => {
  const requests = await DealerRequest.find({
    status: "pending",
  });

  if (!requests) {
    throw new ApiError(404, "No pending requests found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, requests, "Pending dealer requests."));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateUserDetails,
  updateUserAvatar,
  askDealerRegistration,
  acceptDealerRegistration,
  getdealerRequests,
};
