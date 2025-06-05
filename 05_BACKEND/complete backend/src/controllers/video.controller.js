import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { title } from "process";

const getAllVideos = asyncHandler(async (req, res) => {
    //TODO: get all videos based on query, sort, pagination
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

    const filters = {
        isPublished: true,
        title: { $regex: query, $options: "i" },
    };

    if (userId && isValidObjectId(userId)) {
        filters.owner = userId;
    }

    const sortOptions = {
        [sortBy]: sortType === "asc" ? 1 : -1,
    };

    const videos = await Video.find(filters)
        .populate("owner")
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
    return res
        .status(200)
        .json(ApiResponse(200, "Videos fetched successfully", videos));
});

const publishAVideo = asyncHandler(async (req, res) => {
    // TODO: get video, upload to cloudinary, create video
    const { title, description } = req.body;
    if (!req.files?.video) {
        throw new ApiError(400, "Video is not found");
    }

    const videoUpload = await uploadOnCloudinary(req.files.video.tempFilePath);
    const thumbnailUpload = req.files.thumbnail
        ? await uploadOnCloudinary(req.files.thumbnail.tempFilePath)
        : null;

    const video = await Video.create({
        title,
        description,
        video: videoUpload.url,
        thumbnail: thumbnailUpload?.url || "",
        owner: req.user._id,
    });

    return res
        .status(200)
        .json(ApiResponse(200, "Video published successfully", video));
});

const getVideoById = asyncHandler(async (req, res) => {
    //TODO: get video by id
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId).populate("owner", "username");
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res
        .status(200)
        .json(ApiResponse(200, "Video fetched successfully", video));
});

const updateVideo = asyncHandler(async (req, res) => {
    //TODO: update video details like title, description, thumbnail
    const { videoId } = req.params;
    const { title, description } = req.body;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    if (title) {
        video.title = title;
    }
    if (description) {
        video.description = description;
    }
    if (req.files?.thumbnail) {
        const thumbnailUpload = await uploadOnCloudinary(
            req.files.thumbnail.tempFilePath
        );
        video.thumbnail = thumbnailUpload.url;
    }
    await video.save();

    return res
        .status(200)
        .json(ApiResponse(200, "Video updated successfully", video));
});

const deleteVideo = asyncHandler(async (req, res) => {
    //TODO: delete video
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findByIdAndDelete(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    return res
        .status(200)
        .json(ApiResponse(200, "Video deleted successfully", video));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    //TODO: toggle publish/unpublish status
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video id");
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    video.isPublished = !video.isPublished;
    await video.save();

    return res
        .status(200)
        .json(ApiResponse(200, "Video status updated successfully", video));
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
};
