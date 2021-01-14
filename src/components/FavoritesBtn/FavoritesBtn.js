import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useLocation, Link } from 'react-router-dom';

const FavoritesBtn = () => {
	const location = useLocation();

	const changeLocation = () => {
		if (location.pathname === '/') {
			return (
				<Button
					as={Link}
					to="/favorites"
					color="teal"
					floated="left"
					size="tiny"
				>
					<Icon name="star" color="yellow" />
					Favorites
				</Button>
			);
		} else {
			return (
				<Button as={Link} to="/" color="orange" floated="left" size="tiny">
					<Icon name="home" color="purple" />
					Back Home
				</Button>
			);
		}
	};

	return <div>{changeLocation()}</div>;
};

export default FavoritesBtn;
