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
			<div className="card card-body video-card" style={{ cursor: "pointer" }} onClick={() => navigate(`/update/${video._id}`)}>
				<div className="d-flex justify-content-between">
					<h3>
						{video.title}
					</h3>
					<span
						className="text-danger"
						onClick={() => video._id && handleDelete(video._id)}
					>
						X
					</span>
				</div>
				<p>{video.description}</p>
				<div className='player-wrapper'>
					<ReactPlayer
						className='react-player'
						url={video.url}
						width='100%'
						height='100%'
					/>
				</div>
			</div>
		</div>
	);
};

export default VideoItem;
