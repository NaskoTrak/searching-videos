import axios from 'axios';

const KEY = 'AIzaSyBuk4lxRv2qpu59gWK9QrjkdSkg5dvCDOg';

let nextPageToken = null;

export default async (term, dispatch, isFirstSearch) => {
	if(isFirstSearch) {
		nextPageToken = null;
	}
	axios
		.get('https://www.googleapis.com/youtube/v3/search', {
			params: {
				part: 'snippet',
				maxResults: 20,
				key: KEY,
				q: term,
				pageToken: nextPageToken,
			},
		})
		.then((res) => {
			
			nextPageToken = res.data.nextPageToken;
			const youtubeData = res.data.items.map((video) => ({
				videoId: video.id.videoId,
				title: video.snippet.title,
				iframeUrl: 'https://www.youtube.com/embed/' + video.id.videoId,
				thumbnail: video.snippet.thumbnails.medium.url,
				source: 'youtube',
				isBookmarked: false,
			}));

			dispatch({
				type: 'ADD_VIDEOS',
				payload: youtubeData,
			});
		});
};
