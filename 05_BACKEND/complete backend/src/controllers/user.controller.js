import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //  USER REGISTRATION LOGIC/STEPS/ALGORITHM
    //  get user data from frontend
    //  validate user data --> not empty from fields
    //  check if user already exists: username, email
    //  check for images and avatar
    //  upload them to cloudinary
    //  create user object --> create entry in the database
    //  remove password and refresh token fields from response
    //  check for user creation
    //  return response

    // GET USER DATA FROM FRONTEND
    const { fullname, email, username, password } = req.body;

    // VALIDATE USER DATA
    if (
        [fullname, email, username, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // alternative approach --> 
    // if (fullname === "" || email === "" || username === "" || password === "") {
    //     throw new ApiError(400, "Please fill all the fields");
    // }

    // CHECK IF USER ALREADY EXISTS
    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    // CHECK FOR IMAGES AND AVATAR
    let coverImageLocalPath = "";          //optional field
    if (
        req.files &&
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage.length > 0
    ) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    const avatarLocalPath = req.files?.avatar[0]?.path;     //compulsory field
    if (!avatarLocalPath) {
        throw new ApiError(400, "Please upload both avatar");
    }

    // UPLOAD THEM TO CLOUDINARY
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    // CREATE USER OBJECT
    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
        avatar: avatar?.url,
        coverImage: coverImage?.url || "",
    });

    // REMOVE PASSWORD AND REFRESH TOKEN FROM RESPONSE
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // CHECK FOR USER CREATION
    if (!createdUser) {
        throw new ApiError(500, "User creation failed");
    }

    // RETURN RESPONSE
    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User created successfully"));
});

export { registerUser };
