import React from 'react';
import Logo from './common/Logo';
import Menu from './common/Menu';
import NavList from './common/NavList';
import NavItem from './common/NavItem';
import NavHeader from './common/NavHeader';
import SearchBar from './SearchBar';
import AboutModal from './AboutModal';
import M from 'materialize-css';

export default class Nav extends React.Component {
	componentDidMount() {
		M.Sidenav.init(document.querySelector('.sidenav'));
	}

	render() {
		return (
			<header>
			<div className="navbar-fixed">
				<nav>
					<div className="nav-wrapper">
						<Logo/>
						<Menu/>
						<NavList className="right hide-on-med-and-down">
							<NavItem icon="home" link="/">Home</NavItem>
							<NavItem icon="favorite" link="/favorites">Favorites</NavItem>
							<NavItem icon="file_download" link="/downloads">Downloads</NavItem>
							<NavItem icon="help" link="#about" className="modal-trigger">About Us</NavItem>
							<NavItem icon="account_circle" link="/login">Sign In</NavItem>
						</NavList>
						<SearchBar />
					</div>
				</nav>
			</div>
			<NavList className="sidenav" id="mobile">
				<NavHeader>MangaKat</NavHeader>
				<NavItem icon="home" link="/">Home</NavItem>
				<NavItem icon="favorite" link="/favorites">Favorites</NavItem>
				<NavItem icon="file_download" link="/downloads">Downloads</NavItem>
				<NavItem icon="help" link="#about" className="modal-trigger">About Us</NavItem>
				<NavItem icon="account_circle" link="/login">Sign In</NavItem>
			</NavList>
			<AboutModal/>
			</header>
		);
	}
}