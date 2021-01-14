import React, { createContext, useReducer } from 'react';
import { hardcodedFavorites } from '../apis/hardcodedData';

const initialState = {
	videos: [],
	youtube: false,
	dailymotion: true,
	vimeo: false,
	selectedVideos: null,
	searchTerm: '',
	isLogged: null,
	favorites: [],
	filteredFavorites: [],
};

export const VideoContext = createContext(initialState);

const loadUserFavorites = (userId) => {
	// Get user's favorites from server
	return hardcodedFavorites;
};

const filterUniqueVideos = (newVideos, oldVideos) => {
	return newVideos.filter((newVideo) => {
		let isUnique = true;
		oldVideos.forEach((oldVideo) => {
			if (newVideo.videoId === oldVideo.videoId) {
				isUnique = false;
				return;
			}
		});

		return isUnique;
	});
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_YOUTUBE':
			// console.log('State on youtube changed ' + JSON.stringify(state));
			// console.log('New State for youtube changed ' + JSON.stringify(state));
			return { ...state, youtube: !state.youtube };

		case 'CHANGE_DAILYMOTION':
			state.dailymotion = !state.dailymotion;
			return state;

		case 'CHANGE_VIMEO':
			state.vimeo = !state.vimeo;
			return state;

		case 'ADD_VIDEOS':
			// Sometimes the APIs return the same videos, so we remove the new video if already exists
			const uniqueVideos = filterUniqueVideos(action.payload, state.videos);

			uniqueVideos.forEach((video) => {
				state.favorites.forEach((favorite) => {
					if (video.videoId === favorite.videoId) {
						video.isBookmarked = true;
					}
				});
			});
			return { ...state, videos: [...state.videos, ...uniqueVideos] };

		case 'CLEAR_VIDEOS':
			return { ...state, videos: [] };

		case 'SET_LOGIN':
			return { ...state, isLogged: action.payload };

		case 'SET_FAVORITES':
			const userFavorites = loadUserFavorites(action.payload);
			state = {
				...state,
				filteredFavorites: userFavorites,
			};
			return { ...state, favorites: userFavorites };

		case 'ADD_FAVORITES':
			action.payload.isBookmarked = true;
			state = {
				...state,
				filteredFavorites: [action.payload, ...state.favorites],
			};
			return { ...state, favorites: [action.payload, ...state.favorites] };

		case 'REMOVE_FAVORITES':
			action.payload.isBookmarked = false;
			state = {
				...state,
				filteredFavorites: state.favorites.filter(
					(video) => video.videoId !== action.payload.videoId
				),
			};
			return {
				...state,
				favorites: state.favorites.filter(
					(video) => video.videoId !== action.payload.videoId
				),
			};

		case 'FILTER_FAVORITES':
			return { ...state, filteredFavorites: action.payload };

		case 'SET_TERM':
			return { ...state, searchTerm: action.payload };

		default:
			throw new Error('State error');
	}
};

export const VideoContextProvider = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<VideoContext.Provider value={{ state, dispatch }}>
			{props.children}
		</VideoContext.Provider>
	);
};
