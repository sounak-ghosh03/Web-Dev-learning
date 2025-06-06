import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const comments = await Comment.find({ video: videoId })
        .populate("user")
        .sort({
            createdAt: -1,
        })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

    const totalComments = await Comment.countDocuments({ video: videoId });

    return res
        .status(200)
        .json(ApiResponse(200, "Comments fetched successfully", {comments, totalComments}));
});

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { videoId } = req.params;
    const { text } = req.body;
    
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    if (!text) {
        throw new ApiError(400, "Comment text is required");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const comment = await Comment.create({
        text,
        video: videoId,
        user: req.user._id,
        createdAt: new Date(),
    });
    await comment.save();

    return res
        .status(201)
        .json(ApiResponse(201, "Comment added successfully", comment));
});

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { commentId } = req.params;
    const { text } = req.body;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }

    if (!text) {
        throw new ApiError(400, "Comment text is required");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    if (comment.user.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this comment");
    }

    comment.text = text;
    await comment.save();

    return res
        .status(200)
        .json(ApiResponse(200, "Comment updated successfully", comment));
});

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const { commentId } = req.params;

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment id");
    }

    if(!req.owner._id.toString() === req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this comment");
    }

    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    return res
        .status(200)
        .json(ApiResponse(200, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
