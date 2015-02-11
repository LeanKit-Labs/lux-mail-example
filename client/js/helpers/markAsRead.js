define( [
	"lodash",
	"lux.js",
	"stores/layoutStore"
], function( _, lux, layoutStore ) {
		var markAsRead = lux.mixin( {
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

		return markAsRead;
	} );
