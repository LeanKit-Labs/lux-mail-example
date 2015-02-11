define( [
	"lux.js"
], function( lux ) {
		return new lux.Store( {
				namespace: "layout",
				state: {
					currentMessageId: null,
					loading: false,
				},
				handlers: {
					loadMessages: function() {
						this.setState( { loading: true } );
					},
					messagesLoaded: function( messages ) {
						var currentMessageId = this.getState().currentMessageId;
						this.setState( {
							loading: false,
							currentMessageId: currentMessageId || ( messages[ 0 ] ? messages[ 0 ].id : null )
						} );
					},
					selectMessage: function( id ) {
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
				},
				getLoading: function() {
					return this.getState().loading;
				}
			} );
	} );
