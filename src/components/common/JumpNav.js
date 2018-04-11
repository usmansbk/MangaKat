import React from 'react';
import Select from './Select';

export default function JumpNav(props) {
	const {page, chapter, chapters, pages, onChange, value, ...rest} = props;
		let pageOptions = pages && pages.map((option, index) => {
			const value = option.pageId || option.mangaId
			return (
				<option key={index} value={value}>{option.pageId || option.name}</option>
			);
		});

		let chapterOptions = chapters && chapters.map((option, index) => {
			const value = option.chapterId 
			return (
				<option key={index} value={value}>Chapter {option.chapterId}: {option.name}</option>
			);
		});

	const style1 = {
		display: 'inline',
		width: '300px',
		margin: '0'
	}

	const style2 = {
		display: 'inline',
		width: '50px',
		margin: '0'
	}
	const divStyle = {
		display: 'inline'
	}
	return (
		<div style={divStyle} className='browser-default'>
			<Select name='chapterId' value={chapter} onChange={onChange} options={chapterOptions} style={style1} {...rest}/>
			<Select name='pageId' value={page} onChange={onChange} options={pageOptions} style={style2} {...rest}/><span className='flow-text'> Of {pages && pages.length}</span>
		</div>
	);
}