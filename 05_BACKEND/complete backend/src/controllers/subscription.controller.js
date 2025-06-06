import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    // TODO: toggle subscription
    const { channelId } = req.params;
    const userId = req.user._id;
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Channel id is not found");
    }

    const existingSubscription = await Subscription.findOne({
        channel: channelId,
        subscriber: userId,
    });
    if (existingSubscription) {
        await Subscription.findByIdAndDelete(existingSubscription._id);

        return res
            .status(200)
            .json(ApiResponse(200, "Unsubscribed successfully"));
    }

    // await Subscription.create({
    //     channel: channelId,
    //     subscriber: req.user._id,
    // });
    const subscription = new Subscription({
        channel: channelId,
        subscriber: userId,
    });

    await subscription.save();

    return res.status(200).json(ApiResponse(200, "Subscribed successfully"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Channel id is not found");
    }

    const subscribers = await Subscription.find({
        channel: channelId,
    }).populate("subscriber", "username", "user");

    if (subscribers.length === 0) {
        throw new ApiError(404, "Subscribers not found");
    }

    const subscriberList = subscribers.map((subscriber) => subscriber.user);

    return res
        .status(200)
        .json(
            ApiResponse(200, "Subscribers fetched successfully", subscriberList)
        );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;
    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Subscriber id is not found");
    }

    const channels = await Subscription.find({
        subscriber: subscriberId,
    }).populate("channel", "channelName");

    if (channels.length === 0) {
        throw new ApiError(404, "Channels not found");
    }

    const channelList = channels.map((channel) => channel.channel);

    return res
        .status(200)
        .json(ApiResponse(200, "Channels fetched successfully", channelList));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
