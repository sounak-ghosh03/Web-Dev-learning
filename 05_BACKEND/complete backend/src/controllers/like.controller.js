import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    //TODO: toggle like on video
    const { videoId } = req.params;
    const userId = req.user._id;
    if (!videoId) {
        throw new ApiError(400, "Video id is not found");
    }

    // check if user has already liked the video
    const existingLike = await Like.findOne({
        videoId,
        userId,
    });

    // if user has already liked the video, remove the like
    if (existingLike) {
        await Like.findByIdAndDelete({
            videoId,
            userId,
        });
        return res
            .status(200)
            .json(ApiResponse(200, "Like removed successfully"));
    }

    // if user has not liked the video, create a new like
    const like = new Like({
        videoId,
        userId,
    });
    await like.save();

    return res.status(200).json(ApiResponse(200, "Video liked successfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
    //TODO: toggle like on comment
    const { commentId } = req.params;
    const userId = req.user._id;
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Comment id is not found");
    }

    // check if user has already liked the comment
    const existingLike = await Like.findOne({
        commentId,
        userId,
    });

    // if user has already liked the comment, remove the like
    if (existingLike) {
        await Like.findByIdAndDelete({
            commentId,
            userId,
        });
        return res
            .status(200)
            .json(ApiResponse(200, "Like removed successfully"));
    }

    // if user has not liked the comment, create a new like
    const like = new Like({
        commentId,
        userId,
    });
    await like.save();

    return res.status(200).json(ApiResponse(200, "Comment liked successfully"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
    //TODO: toggle like on tweet
    const { tweetId } = req.params;
    const userId = req.user._id;
    if (!tweetId) {
        throw new ApiError(400, "Tweet id is not found");
    }

    // check if user has already liked the tweet
    const existingLike = await Like.findOne({
        tweetId,
        userId,
    });

    // if user has already liked the tweet, remove the like
    if (existingLike) {
        await Like.findByIdAndDelete({
            tweetId,
            userId,
        });
        return res
            .status(200)
            .json(ApiResponse(200, "Like removed successfully"));
    }

    // if user has not liked the tweet, create a new like
    const like = new Like({
        tweetId,
        userId,
    });
    await like.save();

    return res.status(200).json(ApiResponse(200, "Tweet liked successfully"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    // Find all the likes made by the user related to videos
    const likedVideos = await Like.find({
        user: req.user._id,
        videoId: { $ne: null },
    }).populate("videoId");

    // If the user has not liked any videos, return an message
    if (likedVideos.length === 0) {
        return res
            .status(200)
            .json(ApiResponse(200, "No liked videos found", []));
    }

    // Return the liked videos
    return res
        .status(200)
        .json(
            ApiResponse(200, "Liked videos fetched successfully", likedVideos)
        );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
