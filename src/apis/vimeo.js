import axios from 'axios';

const TOKEN = '45455e4a89f9dd6b437169e316d96cbe';

let pageNumber = 1;

export default async (term, dispatch, isFirstSearch) => {
	if (isFirstSearch) {
		pageNumber = 1;
	} else {
		pageNumber++;
	}
	axios
		.get('https://api.vimeo.com/videos?', {
			params: {
				query: term,
				access_token: TOKEN,
				token_type: 'bearer',
				scope: 'public',
				page: pageNumber,
				per_page: 20,
			},
		})
		.then((res) => {
			const vimeoData = res.data.data.map((video) => ({
				videoId: video.uri,
				title: video.name,
				iframeUrl: 'https://player.vimeo.com/video/' + video.uri.split('/')[2],
				thumbnail: video.pictures.sizes[2].link,
				source: 'vimeo',
				isBookmarked: false,
			}));

			dispatch({
				type: 'ADD_VIDEOS',
				payload: vimeoData,
			});
		});
};
