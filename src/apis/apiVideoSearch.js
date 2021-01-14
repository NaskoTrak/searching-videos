import youtube from '../apis/youtube';
import dailymotion from '../apis/dailymotion';
import vimeo from '../apis/vimeo';

export default (term, state, dispatch, isFirstSearch) => {
	dispatch({ type: 'SET_TERM', payload: term });

	try {
		if (state.youtube) {
			youtube(term || 'cats', dispatch, isFirstSearch);
		}
		if (state.dailymotion) {
			dailymotion(term || 'cats', dispatch, isFirstSearch);
		}
		if (state.vimeo) {
			vimeo(term || 'cats', dispatch, isFirstSearch);
		}
	} catch (error) {
		console.error('ERRORR ' + error);
	}
};
