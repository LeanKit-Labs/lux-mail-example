define( [
	"babel/polyfill",
	"react",
	"react-dom",
	"lux.js",
	"components/ViewComponent.jsx",
	"data/remote",
	"helpers/markAsRead"
], function( to5, React, ReactDOM, lux, ViewComponent ) {
	var appEl = document.querySelector( ".app" );
	ReactDOM.render( React.createElement( ViewComponent ), appEl );

	var boot = lux.actionCreatorListener( {
		handlers: {
			pageInitialized: function() {
				this.publishAction( "loadMessages" );
			}
		}
	} );

	boot.publishAction( "loadPage" );

	window.lux = lux;
} );
