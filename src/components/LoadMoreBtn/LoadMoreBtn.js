import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react';
import { VideoContext } from '../../context/videoContext';
import apiVideoSearch from '../../apis/apiVideoSearch';

const LoadMoreBtn = () => {
	const { state, dispatch } = useContext(VideoContext);

	const loadMore = () => {
		apiVideoSearch(state.searchTerm, state, dispatch, false);
	};

	return (
		<div>
			<Button
				compact
				content="Load More"
				icon="level down"
				labelPosition="right"
				onClick={loadMore}
			/>
		</div>
	);
};

export default LoadMoreBtn;
