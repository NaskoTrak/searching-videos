import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
	return (
		<div className={styles.parent}>
			<div className={styles.footer}>
				&copy; {new Date().getFullYear()} Copyright:{' '}
				<a href="https://github.com/NaskoTrak"> NaskoTrak </a>
			</div>
		</div>
	);
};

export default Footer;
