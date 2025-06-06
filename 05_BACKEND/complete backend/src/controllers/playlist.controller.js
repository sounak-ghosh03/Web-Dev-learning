import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
    //TODO: create playlist
    const { name, description } = req.body;
    if (!name || !description) {
        throw new ApiError(400, "Name is required");
    }

    const playlist = await Playlist.create({
        name,
        description,
        user: req.user._id,
    });

    return res
        .status(201)
        .json(ApiResponse(201, "Playlist created successfully", playlist));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
    //TODO: get user playlists
    const { userId } = req.params;
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "User id is not found");
    }

    const playlists = await Playlist.findById({ userId }).sort({
        createdAt: -1,
    });

    if (!playlists || playlists.length === 0) {
        throw new ApiError(404, "Playlists not found");
    }

    return res
        .status(200)
        .json(
            ApiResponse(200, "User Playlists fetched successfully", playlists)
        );
});

const getPlaylistById = asyncHandler(async (req, res) => {
    //TODO: get playlist by id
    const { playlistId } = req.params;
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Playlist id is not found");
    }

    const playlist = await Playlist.findById(playlistId).populate("videos");
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    return res
        .status(200)
        .json(ApiResponse(200, "Playlist fetched successfully", playlist));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    // TODO: add video to playlist
    const { playlistId, videoId } = req.params;
    if (!isValidObjectId(playlistId && videoId)) {
        throw new ApiError(400, "Playlist id and video id is not found");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    // check if video is already in playlist and push it if not
    if (!playlist.videos.includes(videoId)) {
        playlist.videos.push(videoId);
        await playlist.save();
    }

    return res
        .status(200)
        .json(ApiResponse(200, "Video added to playlist successfully"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    // TODO: remove video from playlist
    const { playlistId, videoId } = req.params;
    if (!(playlistId && videoId)) {
        throw new ApiError(400, "Playlist id and video id is not found");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (playlist.videos.includes(videoId)) {
        playlist.videos.splice(playlist.videos.indexOf(videoId), 1);
        await playlist.save();
    }

    return res
        .status(200)
        .json(ApiResponse(200, "Video removed from playlist successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
    // TODO: delete playlist
    const { playlistId } = req.params;
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }

    const playlist = await Playlist.findByIdAndDelete(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    return res
        .status(200)
        .json(ApiResponse(200, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
    //TODO: update playlist
    const { playlistId } = req.params;
    const { name, description } = req.body;
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id");
    }

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
        throw new ApiError(404, "Playlist not found");
    }

    if (name) playlist.name = name || playlist.name;
    if (description) playlist.description = description || playlist.description;
    await playlist.save();

    return res
        .status(200)
        .json(ApiResponse(200, "Playlist updated successfully", playlist));
});

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
};
