import React from 'react';
import Icon from './Icon';

export default function DownloadItem(props) {
	const { children, onClick, chapterId, mangaId, isDownloading} = props;
	return (
		<li className='collection-item'>
			<div>
				{ children }
				<a
					href="#!"
					id={`/${mangaId}/${chapterId}`}
				 	className='secondary-content'
				 	onClick={onClick}
				 	name={`${isDownloading?'sync':'file_download'}`}
				 	>
					<Icon name={`${isDownloading?'sync':'file_download'}`} />
				</a>
			</div>
		</li>
	);
}