import _ from "lodash";
import lux from "lux.js";
import layoutStore from "stores/layoutStore";

const markAsRead = lux.mixin( {
	stores: {
		listenTo: "layout",
		onChange: function() {
			this.debouncedMark( layoutStore.getCurrentMessageId() );
		}
	},
	debouncedMark: _.debounce( function( id ) {
		if ( id ) {
			markAsRead.publishAction( "markAsRead", id );
		}
	}, 2000 )
}, lux.mixin.store, lux.mixin.actionCreator );

export default markAsRead;
