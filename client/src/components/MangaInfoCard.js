import React from 'react';
import M from 'materialize-css';
import TableItem from './common/TableItem';

export default class MangaInfoCard extends React.Component {

	componentDidMount() {
		M.Collapsible.init(document.querySelector('.collapsible'));
	}
	
	render() {
		const {manga_title, src, author, chapters, status, score, last_update, summary} = this.props;
		const style = {
			maxHeight: "100%",
			maxWidth: "100%"
		}
		return (
			<div className="col s12 m6 l6">
				<div className="card horizontal">
					<div className="card-image">
						<img alt={manga_title} src={src} style={style} />
					</div>
					<div className="card-stacked">
						<div className="card-content">
							<span className="card-title grey-text text-darken-4">{manga_title}</span>
							<table>
								<tbody>
									<TableItem title="Author" value={author}/>
									<TableItem title="Chapters" value={chapters} />
									<TableItem title="Status" value={status} />
									<TableItem title="Score" value={score} />
									<TableItem title="Last Update" value={last_update} />
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
									{summary}
								</p>
							</div>
						</li>
					</ul>
				</section>
			</div>
		);
	}
}