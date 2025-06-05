import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    // TODO: toggle subscription
    const { channelId } = req.params;
    if (!channelId) {
        throw new ApiError(400, "Channel id is not found");
    }

    const existingSubscription = await Subscription.findOne({
        channel: channelId,
        subscriber: req.user._id,
    });
    if (existingSubscription) {
        await Subscription.findByIdAndDelete(existingSubscription._id);
        return res
            .status(200)
            .json(ApiResponse(200, "Unsubscribed successfully"));
    }

    await Subscription.create({
        channel: channelId,
        subscriber: req.user._id,
    });

    return res.status(200).json(ApiResponse(200, "Subscribed successfully"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    if (!channelId) {
        throw new ApiError(400, "Channel id is not found");
    }

    const subscribers = await Subscription.find({
        channel: channelId,
    }).populate("subscriber", "username");

    return res
        .status(200)
        .json(
            ApiResponse(200, "Subscribers fetched successfully", subscribers)
        );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;
    if (!subscriberId) {
        throw new ApiError(400, "Subscriber id is not found");
    }

    const channels = await Subscription.find({
        subscriber: subscriberId,
    }).populate("channel", "username");

    return res
        .status(200)
        .json(ApiResponse(200, "Channels fetched successfully", channels));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
