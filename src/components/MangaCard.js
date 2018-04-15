import React from 'react';
import Badge from './common/Badge';

export default class MangaCard extends React.Component {
	render() {
		const {img, mangaTitle, newChapters} = this.props;
		const hasNew = newChapters && newChapters.length > 0;
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
						<div className='row'>
							<div className='col s10'>
								<span className="truncate">
									{mangaTitle}
								</span>
							</div>
							{hasNew ?
							<div className='col s2'>
								<Badge>{newChapters.length}</Badge>
							</div>
							: null
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}