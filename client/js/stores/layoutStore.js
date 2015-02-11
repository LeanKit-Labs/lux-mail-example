define( [
	"lux.js"
], function( lux ) {
		return new lux.Store( {
				namespace: "layout",
				state: {
					currentMessageId: null
				},
				handlers: {
					onSelectMessage: function( id ) {
						if ( this.getCurrentMessageId() === id ) {
							this.setState( { currentMessageId: null } );
						} else {
							this.setState( { currentMessageId: id } );
						}
					},
					archive: function() {
						this.setState( { currentMessageId: null } );
					},
					reply: function() {
						alert( "You cannot reply yet, sorry!" );
					},
					forward: function() {
						alert( "You cannot forward yet, sorry!" );
					}
				},
				getCurrentMessageId: function() {
					return this.getState().currentMessageId;
				}
			} );
	} );
