import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

const ScrollToTop = () => {
	const [showScroll, setShowScroll] = useState(false);

	const checkScroll = () => {
		if (!showScroll && window.pageYOffset > 200) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= 200) {
			setShowScroll(false);
		}
	};

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	window.addEventListener('scroll', checkScroll);

	return (
		<Icon
			link
			size="huge"
			color="violet"
			name="arrow alternate circle up outline"
			onClick={scrollTop}
			style={{ display: showScroll ? 'flex' : 'none' }}
		/>
	);
};

export default ScrollToTop;
