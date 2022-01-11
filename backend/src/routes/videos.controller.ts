import { RequestHandler } from "express";
import Video from "./Videos";

export const getVideos: RequestHandler = async (req, res) => {
	try {
		const videos = await Video.find();
		return res.json(videos);
	} catch (error) {
		return res.json(error);
	}
};

export const createVideo: RequestHandler = async (req, res) => {
	const videoFound = await Video.findOne({ url: req.body.url });

	if (videoFound) {
		return res.status(302).json({ message: "The URL already exists." });
	}

	const video = new Video(req.body);
	const savedVideo = await video.save();
	return res.json(savedVideo);
};

export const getVideo: RequestHandler = async (req, res) => {
	const video = await Video.findById(req.params.id);
	if (!video) {
		return res.status(204).json();
	}

	return res.json(video);
};

export const deleteVideo: RequestHandler = async (req, res) => {
	const video = await Video.findByIdAndDelete(req.params.id);
	if (!video) {
		return res.status(204).json();
	}
	return res.json(video);
};

export const updateVideo: RequestHandler = async (req, res) => {
	const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	return res.json(video);
};
