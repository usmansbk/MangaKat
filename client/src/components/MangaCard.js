import React from 'react';
import Icon from './common/Icon';

export default class MangaCard extends React.Component {
	render() {
		const {src, title, icon, manga_title} = this.props;
		const style = { height: "200px" };
		return (
			<div className="col s6 m4 l2">
				<div className="card hoverable">
					<div className="card-image">
						<img alt={manga_title} src={src} style={style} />
						<span title={title} className="btn-floating halfway-fab red">
							<Icon name={icon}/>
						</span>
					</div>
					<div className="card-content">
						<span className="truncate">{manga_title}</span>
					</div>
				</div>
			</div>
		);
	}
}