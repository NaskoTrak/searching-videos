import React, { useContext, useState } from 'react';
import { VideoContext } from '../../context/videoContext';
import { Form, Input, Button, Checkbox } from 'semantic-ui-react';
import styles from './SearchBar.module.css';
import apiVideoSearch from '../../apis/apiVideoSearch';

const SearchBar = () => {
	const [term, setTerm] = useState('');
	const { state, dispatch } = useContext(VideoContext);

	const onFormSubmit = (event) => {
		event.preventDefault();
		// console.log('State ' + JSON.stringify(state));
		dispatch({ type: 'CLEAR_VIDEOS' });
		apiVideoSearch(term, state, dispatch, true);
	};

	return (
		<div className={styles.searchSegment}>
			<Form className={styles.searchForm} onSubmit={onFormSubmit}>
				<Form.Field className={styles.searchField}>
					<Input
						className={styles.searchInput}
						size="large"
						type="text"
						placeholder="Search videos"
						value={term}
						onChange={(e) => setTerm(e.target.value.toLocaleLowerCase())}
					/>
					<Button
						className={styles.button}
						size="large"
						color="violet"
						onClick={() => onFormSubmit}
					>
						Search
					</Button>
				</Form.Field>
				<div className={styles.checkboxes}>
					<Checkbox
						label="YouTube"
						defaultChecked={state.youtube}
						onChange={() => dispatch({ type: 'CHANGE_YOUTUBE' })}
					/>
					<Checkbox
						label="DailyMotion"
						defaultChecked={state.dailymotion}
						onChange={() => dispatch({ type: 'CHANGE_DAILYMOTION' })}
					/>
					<Checkbox
						label="Vimeo"
						defaultChecked={state.vimeo}
						onChange={() => dispatch({ type: 'CHANGE_VIMEO' })}
					/>
				</div>
			</Form>
		</div>
	);
};

export default SearchBar;
