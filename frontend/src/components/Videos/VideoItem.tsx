import React from "react";
import { Video } from "./Video";
import ReactPlayer from "react-player";
import * as VideoService from "./VideoService";

import "./VideoItem.css";
import { useNavigate } from "react-router-dom";

interface Props {
	video: Video;
	loadVideos: () => void;
}

export const VideoItem = ({ video, loadVideos }: Props) => {
	const navigate = useNavigate();

	const handleDelete = async (id: string) => {
		await VideoService.deleteVideo(id);
		loadVideos();
	};

	return (
		<div className="col-md-4">
			<div className="card card-body video-card" style={{ cursor: "pointer" }}>
				<div className="d-flex justify-content-between">
					<h1 onClick={() => navigate(`/update/${video._id}`)}>
						{video.title}
					</h1>
					<span
						className="text-danger"
						onClick={() => video._id && handleDelete(video._id)}
					>
						X
					</span>
				</div>
				<p>{video.description}</p>
				<div className="player-wrapper">
					<ReactPlayer
						url={video.url}
						className="react-player"
						playing
						width="100%"
						height="100%"
						controls={false}
					/>
				</div>
			</div>
		</div>
	);
};

export default VideoItem;
