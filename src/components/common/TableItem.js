import React from 'react';

export default function TableItem(props) {
	const {title, value} = props;
	return (
		<tr>
			<th>{title}</th>
			<td>{value}</td>
		</tr>
	);
}