import { connect } from 'react-redux'
import SearchBar from '../components/dashboard/SearchBar'
import {searchManga} from '../redux/actions';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => {
  return {
    find: mangaId => {
      dispatch(searchManga(mangaId))
    }
  }
}

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar)

export default SearchBarContainer