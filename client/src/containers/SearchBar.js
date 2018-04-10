import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SearchBar from '../components/dashboard/SearchBar';
import {searchManga} from '../redux/actions';

const mapStateToProps = state => {
	return{
		search: state.search
	}
};
const mapDispatchToProps = dispatch => {
  return {
    find: mangaId => {
      dispatch(searchManga(mangaId));
    }
  }
}

const SearchBarContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar));

export default SearchBarContainer