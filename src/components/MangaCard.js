import React from 'react';
import Badge from './common/Badge';

export default class MangaCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {dataURL: '/favicon.ico'}
	}

	componentWillReceiveProps(nextProps) {
		const {img, getCover} = this.props;
		getCover(img).then(dataURL => this.setState({dataURL})).catch(() => console.log(Error('Unable to fetch cover')));
	}
	render() {
		const {mangaTitle, newChapters} = this.props;
		const hasNew = newChapters && newChapters.length > 0;
		const style = {
			height: "200px",
			padding: "4px"
		};
		return (
			<div className="col s6 m4 l2">
				<div className="card hoverable">
					<div className="card-image">
						<img alt={mangaTitle} src={this.state.dataURL} style={style} />
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