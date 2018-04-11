import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SearchBar from '../components/dashboard/SearchBar';
import {searchManga, updateCount} from '../redux/actions';

const mapStateToProps = state => {
	return{
		search: state.search
	}
};
const mapDispatchToProps = dispatch => {
  return {
    find: mangaId => {
      dispatch(searchManga(mangaId));
      dispatch(updateCount(0));
    }
  }
}

const SearchBarContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar));

export default SearchBarContainer