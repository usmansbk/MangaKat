import React from 'react';
import Icon from './Icon';

export default function ListItem({href,aStyle, children}) {
	return (
		<li className={`collection-item`}>
			<div>
				{children}
				<a
				href={href}
				className="secondary-content"
				style={aStyle}
				>
					<Icon name="file_download"/>
				</a>
			</div>
		</li>
	);
}