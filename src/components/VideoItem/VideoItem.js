import React, { useState, useContext } from 'react';
import { Grid, Image, Segment, Header, Label } from 'semantic-ui-react';
import SelectedVideo from '../SelectedVideo/SelectedVideo';
import { VideoContext } from '../../context/videoContext';
import styles from './VideoItem.module.css';

const VideoItem = ({ video }) => {
	const [openModal, setOpenModal] = useState(false);
	const { dispatch } = useContext(VideoContext);

	const openModalFunc = () => {
		setOpenModal(true);
	};

	const closeModalFunc = () => {
		setOpenModal(false);
	};

	const handleFavoritesIcon = (e) => {
		e.stopPropagation();
		if (video.isBookmarked === false) {
			dispatch({ type: 'ADD_FAVORITES', payload: video });
		} else {
			dispatch({
				type: 'REMOVE_FAVORITES',
				payload: video,
			});
		}
	};

	const getSourceIcon = (source) => {
		switch (source) {
			case 'youtube':
				return 'youtube';

			case 'dailymotion':
				return 'dochub';

			case 'vimeo':
				return 'vimeo';

			default:
				return 'question';
		}
	};

	return (
		<Grid.Column key={video.title}>
			<Segment
				size={'large'}
				className={styles.videoCard}
				onClick={() => openModalFunc()}
			>
				<Image src={video.thumbnail} alt={video.title} />
				<Label
					as={'a'}
					corner={'left'}
					icon={video.isBookmarked ? 'star' : 'star outline'}
					onClick={handleFavoritesIcon}
				/>
				<Label as={'a'} corner={'right'} icon={getSourceIcon(video.source)} />
				<Header as="h5">{video.title}</Header>
			</Segment>
			<SelectedVideo
				chosenVideo={video}
				open={openModal}
				close={closeModalFunc}
				favoriteChecked={video.isBookmarked}
				handleFavoritesIcon={handleFavoritesIcon}
			/>
		</Grid.Column>
	);
};

export default VideoItem;
