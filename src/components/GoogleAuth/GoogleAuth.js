import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { VideoContext } from '../../context/videoContext';
import { Redirect } from 'react-router-dom';

const CLIENT_ID =
	'1013137634726-o67gqkhafj1f84oq6ds9r0r9bvfu0ok2.apps.googleusercontent.com';
	
class GoogleAuth extends React.Component {
	state = { isSignedIn: null, userName: '' };

	static contextType = VideoContext; // This relates to 'this.context' later in code

	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: CLIENT_ID,
					scope: 'email',
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();
					this.setState({ isSignedIn: this.auth.isSignedIn.get() });
					this.auth.isSignedIn.listen(this.onAuthChange);
					this.context.dispatch({
						type: 'SET_LOGIN',
						payload: this.state.isSignedIn,
					});
				});
		});
	}

	onAuthChange = () => {
		this.setState({ isSignedIn: this.auth.isSignedIn.get() });
		this.context.dispatch({
			type: 'SET_LOGIN',
			payload: this.state.isSignedIn,
		});

		if (this.state.isSignedIn) {
			this.setState({
				userName: this.auth.currentUser.get().getBasicProfile().getGivenName(),
			});
			this.context.dispatch({
				type: 'SET_FAVORITES',
				payload: this.auth.currentUser.get().getBasicProfile().getId(),
			});
		}
	};

	onLogIn = () => {
		this.auth.signIn();
	};

	onLogOut = () => {
		this.auth.signOut();
	};

	handleAuthButton = () => {
		if (this.state.isSignedIn === null) {
			return <Button loading>Loading</Button>;
		} else if (this.state.isSignedIn === true) {
			return (
				<div style={{ position: 'relative' }}>
					<div
						style={{ position: 'absolute', right: '7em', paddingTop: '4px' }}
					>
						<p>Hello {this.state.userName}</p>
					</div>
					<Button
						color="blue"
						floated="right"
						size="tiny"
						onClick={this.onLogOut}
					>
						<Icon name="google" /> Log Off
					</Button>
				</div>
			);
		} else
			return (
				<Button
					color="google plus"
					floated="right"
					size="tiny"
					onClick={this.onLogIn}
				>
					<Icon name="google" /> Log In
					<Redirect to="/" />
				</Button>
			);
	};

	render() {
		return <div>{this.handleAuthButton()}</div>;
	}
}

export default GoogleAuth;
