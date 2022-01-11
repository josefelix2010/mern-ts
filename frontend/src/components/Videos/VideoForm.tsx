import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Video } from "./Video";
import * as VideoService from "./VideoService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const VideoForm = () => {
	const navigate = useNavigate();
	const params = useParams();

	const initialState = {
		title: "",
		description: "",
		url: "",
	};

	const [video, setVideo] = useState<Video>(initialState);

	const handleOnChange = (e: InputChange) => {
		setVideo({ ...video, [e.target.name]: e.target.value });
	};

	const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if(!params.id) {
			await VideoService.createVideo(video);
			toast.success("New video added!");
			setVideo(initialState);
		} else {
			await VideoService.updateVideo(params.id, video);
			toast.success("Video updated!");
			setVideo(initialState);
		}

		navigate("/");
	};

	const getVideo = async (id: string) => {
		const res = await VideoService.getVideo(id);
		const { title, description, url } = res.data;
		setVideo({ title, description, url });
	};

	useEffect(() => {
		if (params.id) getVideo(params.id);
	});

	return (
		<div className="row">
			<div className="col-md-4 offset-md-4">
				<div className="card">
					<div className="card-body">
						<h3>New Video</h3>

						<form onSubmit={handleOnSubmit}>
							<div className="form-group my-4">
								<input
									type="text"
									name="title"
									placeholder="Write a title"
									className="form-control"
									autoFocus
									value={video.title}
									onChange={handleOnChange}
								/>
							</div>

							<div className="form-group my-4">
								<input
									type="text"
									name="url"
									placeholder="https://your-video.com"
									className="form-control"
									value={video.url}
									onChange={handleOnChange}
								/>
							</div>

							<div className="form-group my-4">
								<textarea
									name="description"
									rows={3}
									className="form-control"
									placeholder="Write a description"
									value={video.description}
									onChange={handleOnChange}
								></textarea>
							</div>

							{params.id ? (
								<button className="btn btn-info">Update Video</button>
							) : (
								<button className="btn btn-primary">Create Video</button>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoForm;
