import React from 'react';
import { Grid } from 'semantic-ui-react';
import VideoItem from '../VideoItem/VideoItem';
import styles from './VideoList.module.css';

const VideoList = (props) => {

	return (
		<div className={styles.videoList}>
			<Grid centered columns={5} doubling>
				{props.videos && props.videos.length > 0 ? (
					props.videos.map((video) => (
						<VideoItem video={video} key={video.videoId} />
					))
				) : (
					<div>No Results</div>
				)}
			</Grid>
		</div>
	);
};

export default VideoList;
