import React, { useContext, useEffect, useState } from 'react';
import { VideoContext } from '../../context/videoContext';
import { Form, Input, Checkbox } from 'semantic-ui-react';
import styles from './FavoritesSearchBar.module.css';

const FavoritesSearchBar = (props) => {
	const [term, setTerm] = useState('');
	const { dispatch } = useContext(VideoContext);

	const [checkboxState, setCheckboxState] = useState({
		youtube: true,
		dailyM: true,
		vimeo: true,
	});

	useEffect(() => {
		const filterVideos = () => {
			let filteredVideos = props.favorites.filter((favorite) => {
				if (
					(favorite.source === 'youtube' && !checkboxState.youtube) ||
					(favorite.source === 'dailymotion' && !checkboxState.dailyM) ||
					(favorite.source === 'vimeo' && !checkboxState.vimeo)
				) {
					return false;
				}

				if (!term) return true;
				if (favorite.title.toLowerCase().includes(term.toLowerCase())) {
					return true;
				}
				return false;
			});

			dispatch({ type: 'FILTER_FAVORITES', payload: filteredVideos });
		};

		filterVideos();
	}, [checkboxState, term]);

	return (
		<div className={styles.searchSegment}>
			<Form className={styles.searchForm}>
				<Form.Field className={styles.searchField}>
					<Input
						className={styles.searchInput}
						size="large"
						type="text"
						placeholder="Search Favorites"
						value={term}
						onChange={(e) => {
							setTerm(e.target.value);
						}}
					/>
				</Form.Field>
				<div className={styles.checkboxes}>
					<Checkbox
						label="YouTube"
						defaultChecked={checkboxState.youtube}
						onChange={(e, d) => {
							setCheckboxState({ ...checkboxState, youtube: d.checked });
						}}
					/>
					<Checkbox
						label="DailyMotion"
						defaultChecked={checkboxState.dailyM}
						onChange={(e, d) => {
							setCheckboxState({ ...checkboxState, dailyM: d.checked });
						}}
					/>
					<Checkbox
						label="Vimeo"
						defaultChecked={checkboxState.vimeo}
						onChange={(e, d) => {
							setCheckboxState({ ...checkboxState, vimeo: d.checked });
						}}
					/>
				</div>
			</Form>
		</div>
	);
};

export default FavoritesSearchBar;
