import React from 'react';

export default class MangaCard extends React.Component {
	render() {
		const {img, mangaTitle} = this.props;
		const style = {
			height: "200px",
			padding: "4px"
		};
		return (
			<div className="col s6 m4 l2">
				<div className="card hoverable">
					<div className="card-image">
						<img alt={mangaTitle} src={img} style={style} />
					</div>
					<div
					className="card-content"
					style={
						{
							padding: '0',
							paddingLeft: '4px'
						}
					}
					>
						<span className="truncate">{mangaTitle}</span>
					</div>
				</div>
			</div>
		);
	}
}