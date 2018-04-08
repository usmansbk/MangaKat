import { connect } from 'react-redux'
import ListView from '../components/views/ListView'

const mapStateToProps = (state) => {
	return {
		mangas: state.mangas,
		search: state.search
	}
}

const ListViewContainer = connect(
	mapStateToProps
)(ListView)

export default ListViewContainer