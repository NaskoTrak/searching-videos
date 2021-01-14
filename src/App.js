import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import VideoList from './components/VideoList/VideoList';
import GoogleAuth from './components/GoogleAuth/GoogleAuth';
import FavoritesBtn from './components/FavoritesBtn/FavoritesBtn';
import FavoritesSearchBar from './components/FavoritesSearchBar/FavoritesSearchBar';
import { VideoContext } from './context/videoContext';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Footer from './components/Footer/Footer';

import { Container, Segment } from 'semantic-ui-react';

const App = () => {
	const { state } = useContext(VideoContext);

	return (
		<Router>
			<div className="container" style={{ margin: '1%' }}>
				{state.isLogged && <FavoritesBtn />}
				<GoogleAuth />
				<Switch>
					<Route path="/" exact>
						<Container textAlign="center">
							<SearchBar />
						</Container>
						<Segment style={{ margin: '2% 3%' }}>
							<VideoList videos={state.videos} />
							{state.videos && state.videos.length > 0 && <LoadMoreBtn />}
						</Segment>
					</Route>
					<Route path="/favorites" exact>
						<Container textAlign="center">
							<FavoritesSearchBar favorites={state.favorites} />
						</Container>
						<Segment style={{ margin: '2% 3%' }}>
							<VideoList videos={state.filteredFavorites} />
						</Segment>
					</Route>
				</Switch>
				<ScrollToTop />
				<Footer />
			</div>
		</Router>
	);
};

export default App;
