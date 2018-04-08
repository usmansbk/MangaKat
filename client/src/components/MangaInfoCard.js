import React from 'react';
import M from 'materialize-css';
import TableItem from './common/TableItem';

export default class MangaInfoCard extends React.Component {

	componentDidMount() {
		M.Collapsible.init(document.querySelector('.collapsible'));
	}
	
	render() {
		const {name, cover, author, genres, chapters, status, yearOfRelease, lastUpdate, info} = this.props;
		const style = {
			maxHeight: "100%",
			maxWidth: "100%"
		}
		return (
			<div className="col s12 m6 l6">
				<div className="card horizontal">
					<div className="card-image">
						<img alt={name} src={cover} style={style} />
					</div>
					<div className="card-stacked">
						<div className="card-content">
							<span className="card-title grey-text text-darken-4">{name}</span>
							<table>
								<tbody>
									<TableItem title="Author" value={author && author.join(", ")}/>
									<TableItem title="Chapters" value={chapters && chapters.length} />
									<TableItem title="Status" value={status} />
									<TableItem title="Genres" value={genres && genres.join(", ")}/>
									<TableItem title="Released" value={yearOfRelease} />
									<TableItem title="Last Update" value={lastUpdate && new Date(lastUpdate).toDateString()} />
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<section>
					<ul className="collapsible">
						<li>
							<div className="collapsible-header"><h5>Summary</h5></div>
							<div className="collapsible-body">
								<p className="flow-text">
									{info}
								</p>
							</div>
						</li>
					</ul>
				</section>
			</div>
		);
	}
}