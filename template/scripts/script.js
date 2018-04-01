(function() {
	window.addEventListener('load', function() {
		let elem = document.querySelector('.sidenav');
		let instance = M.Sidenav.init(elem);
		elem = document.querySelector('.modal');
		instance = M.Modal.init(elem);
		elem = document.querySelector('.collapsible');
		instance = M.Collapsible.init(elem);
		elem = document.querySelector('.materialboxed');
		instance = M.Materialbox.init(elem);
	});
})();