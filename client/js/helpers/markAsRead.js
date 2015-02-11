define( [
	"lux.js",
	"stores/layoutStore",
], function( lux, layoutStore ) {

		var markAsRead = lux.mixin( {
			stores: {
				listenTo: "layout",
				onChange: function() {
					this.debouncedMark( layoutStore.getCurrentMessageId() );
				}
			},
			debouncedMark: _.debounce( function( id ) {
				markAsRead.publishAction( "markAsRead", id );
			}, 2000 )
		}, lux.mixin.store, lux.mixin.actionCreator );

		return markAsRead;
	} );
