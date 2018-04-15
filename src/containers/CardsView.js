import { connect } from 'react-redux';
import CardsView from '../components/views/CardsView';
import { clearNotification } from '../redux/actions';

const mapStateToProps = (state) => {
	return {
		mangas: state.mangas,
		favorites: state.favorites,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		clearNotification: () => {
			dispatch(clearNotification());
		}
	}
}

const CardsViewContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardsView)

export default CardsViewContainer 