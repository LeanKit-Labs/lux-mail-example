define( [
	"6to5/polyfill",
	"react",
	"components/ViewComponent.jsx"
], function( to5, React, ViewComponent ) {
		var appEl = document.querySelector( ".app" );
		React.render( React.createElement( ViewComponent ), appEl );
	} );
