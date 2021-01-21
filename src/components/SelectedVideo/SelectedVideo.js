import React, { useContext } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import { VideoContext } from '../../context/videoContext';

const SelectedVideo = (props) => {
	const { state } = useContext(VideoContext);

	return (
		<Modal
			closeIcon
			open={props.open}
			onClose={() => props.close()}
			onOpen={() => props.open()}
		>
			<Modal.Content>
				<div className="ui embed">
					<iframe title="video player" src={props.chosenVideo.iframeUrl} />
				</div>
			</Modal.Content>
			<Modal.Actions>
				{state.isLogged && (
					<Icon
						className={props.favoriteChecked ? 'star' : 'star outline'}
						link
						onClick={props.handleFavoritesIcon}
						size="big"
						style={{ float: 'left' }}
					/>
				)}
				<Button color="black" onClick={() => props.close()}>
					Close
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default SelectedVideo;
