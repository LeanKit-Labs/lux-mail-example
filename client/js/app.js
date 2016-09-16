define( [
	"babel/polyfill",
	"react-dom",
	"react",
	"lux.js",
	"components/ViewComponent.jsx",
	"data/remote",
	"helpers/markAsRead"
], function( to5, ReactDOM, React, lux, ViewComponent ) {
	var appEl = document.querySelector( ".app" );
	ReactDOM.render( React.createElement( ViewComponent ), appEl );

	var boot = lux.actionCreatorListener( {
		handlers: {
			pageInitialized: function() {
				this.dispatch( "loadMessages" );
			}
		}
	} );

	boot.dispatch( "loadPage" );

	window.lux = lux;
} );
