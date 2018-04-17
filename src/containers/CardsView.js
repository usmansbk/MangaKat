import { connect } from 'react-redux';
import localforage from 'localforage';
import CardsView from '../components/views/CardsView';
import { clearNotification, fetchImage } from '../redux/actions';

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
		},
    getCover: (url) => {
      return localforage.getItem(url).then(value => {
          if (value) return value;
          return fetchImage({url})
          .then(base64 => localforage.setItem(url, base64))
        })
    }
	}
}

const CardsViewContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(CardsView)

export default CardsViewContainer 