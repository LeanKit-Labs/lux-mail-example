define( [
	"babel/polyfill",
	"react",
	"lux.js",
	"components/ViewComponent.jsx",
	"data/remote",
	"helpers/markAsRead"
], function( to5, React, lux, ViewComponent ) {
	var appEl = document.querySelector( ".app" );
	React.render( React.createElement( ViewComponent ), appEl );

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
