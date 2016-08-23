import "babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import lux from "lux.js";
import ViewComponent from "components/ViewComponent.jsx";
import "data/remote";
import "helpers/markAsRead";

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