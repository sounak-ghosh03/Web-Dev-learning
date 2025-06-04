import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const { channelId } = req.params;
    if (!channelId) {
        throw new ApiError(400, "Channel id is not found");
    }
    const videos = await Video.find({ user: channelId });

    const totalViews = videos.reduce((sum, video) => sum + video.views, 0);

    const subscribers = await Subscription.countDocuments({
        channel: channelId,
    });

    const totalVideos = await Video.countDocuments({ user: channelId });

    const likes = await Like.countDocuments({
        video: {
            $in: videos.map((video) => video._id),
        },
    });
    return res.status(200).json(
        ApiResponse(200, "Channel stats fetched successfully", {
            totalViews,
            subscribers,
            totalVideos,
            likes,
        })
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const { channelId } = req.params;
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Channel id is not found");
    }

    const videos = await Video.find({ user: channelId })
        .populate("user")
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(ApiResponse(200, "Videos fetched successfully", videos));
});

export { getChannelStats, getChannelVideos };
