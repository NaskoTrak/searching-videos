import axios from 'axios';

// const KEY = 'aDFDUV0LBlRUUVYdHhBPBwxCBwQPTkIGEQgAD1ILBgkZ';
let pageNumber = 1;

export default async (term, dispatch, isFirstSearch) => {
	if (isFirstSearch) {
		pageNumber = 1;
	} else {
		pageNumber++;
	}

	axios
		.get(
			`https://api.dailymotion.com/videos?fields=title%2Ccreated_time%2Cduration%2Cid%2Cembed_url%2Cviews_total%2Cthumbnail_180_url&tags=${term}&page=${pageNumber}`
		)
		.then((res) => {
			const dailymotionData = res.data.list.map((video) => ({
				videoId: video.id,
				title: video.title,
				iframeUrl: 'https://www.dailymotion.com/embed/video/' + video.id,
				thumbnail: video.thumbnail_180_url,
				source: 'dailymotion',
				isBookmarked: false,
			}));

			dispatch({
				type: 'ADD_VIDEOS',
				payload: dailymotionData,
			});
		});
};
