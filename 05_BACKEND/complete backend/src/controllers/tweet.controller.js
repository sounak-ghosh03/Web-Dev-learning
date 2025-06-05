import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const { text } = req.body;
    if (!text) {
        throw new ApiError(400, "Text is required");
    }

    const tweet = await Tweet.create({ text, user: req.user._id });
    await tweet.save();

    return res
        .status(201)
        .json(ApiResponse(201, "Tweet created successfully", tweet));
});

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get tweets of the logged in user
    const tweets = await Tweet.find({ user: req.user._id }).sort({
        createdAt: -1,
    });

    return res
        .status(200)
        .json(ApiResponse(200, "Tweets fetched successfully", tweets));
});

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const tweetId = req.params.id;
    const text = req.body.text;
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet id");
    }

    if (!text) {
        throw new ApiError(400, "Text is required");
    }

    const tweet = await Tweet.findByIdAndUpdate(
        { _id: tweetId, user: req.user._id },
        text,
        { new: true }
    );
    if (!tweet) {
        throw new ApiError(404, "Tweet not found");
    }

    return res
        .status(200)
        .json(ApiResponse(200, "Tweet updated successfully", tweet));
});

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        throw new ApiError(400, "Invalid tweet id");
    }

    const tweet = await Tweet.findByIdAndDelete({
        _id: id,
        user: req.user._id,
    });
    if (!tweet) {
        throw new ApiError(404, "Tweet not found or unauthorized");
    }
    return res.status(200).json(ApiResponse(200, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
