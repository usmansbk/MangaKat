import React from 'react';
import NavControls from './common/NavControls';

export default class ImageView extends React.Component {
	render() {
		const { chapter_name } = this.props;
		const style = {
			width: "inherit",
		};

		return (
			<div className="col m12">
				<img
				src="https://i999.mangapanda.com/one-piece/900/one-piece-10458613.jpg"
				alt={chapter_name}
				style={style} />
				<NavControls />
			</div>
		);
	}
}