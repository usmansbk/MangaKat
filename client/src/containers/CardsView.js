import { connect } from 'react-redux'
import CardsView from '../components/views/CardsView'

const mapStateToProps = (state) => {
	return {
		mangas: state.mangas
	}
}

const CardsViewContainer = connect(
	mapStateToProps
)(CardsView)

export default CardsViewContainer