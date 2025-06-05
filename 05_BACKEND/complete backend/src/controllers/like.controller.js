import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: toggle like on video
    if (!videoId) {
        throw new ApiError(400, "Video id is not found");
    }

    const existingLike = await Like.findOne({
        video: videoId,
        user: req.user._id,
    });

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id);
        return res
            .status(200)
            .json(ApiResponse(200, "Like removed successfully"));
    }

    await Like.create({
        video: videoId,
        user: req.user._id,
    });

    return res.status(200).json(ApiResponse(200, "Video liked successfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    //TODO: toggle like on comment
    if (!commentId) {
        throw new ApiError(400, "Comment id is not found");
    }

    const existingLike = await Like.findOne({
        comment: commentId,
        user: req.user._id,
    });

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id);
        return res
            .status(200)
            .json(ApiResponse(200, "Like removed successfully"));
    }

    await Like.create({
        comment: commentId,
        user: req.user._id,
    });

    return res.status(200).json(ApiResponse(200, "Comment liked successfully"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    //TODO: toggle like on tweet
    if (!tweetId) {
        throw new ApiError(400, "Tweet id is not found");
    }

    const existingLike = await Like.findOne({
        tweet: tweetId,
        user: req.user._id,
    });

    if (existingLike) {
        await Like.findByIdAndDelete(existingLike._id);
        return res
            .status(200)
            .json(ApiResponse(200, "Like removed successfully"));
    }

    await Like.create({
        tweet: tweetId,
        user: req.user._id,
    });

    return res.status(200).json(ApiResponse(200, "Tweet liked successfully"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    const likedVideos = await Like.find({
        user: req.user._id,
        video: { $ne: null },
    }).populate("video");

    return res
        .status(200)
        .json(
            ApiResponse(200, "Liked videos fetched successfully", likedVideos)
        );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
