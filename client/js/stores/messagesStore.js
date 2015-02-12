define( [
	"lux.js",
	"lodash"
], function( lux, _ ) {
		return new lux.Store( {
				namespace: "messages",
				state: {
					messages: []
				},
				handlers: {
					messagesLoaded: function( messages ) {
						var existingMessages = this.getMessages();
						if ( !existingMessages.length ) {
							this.setState( {
								messages: messages
							} );
						} else {
							// Handle merging and updating messages
							// array with new data
						}
					},
					markAsRead: function( id ) {
						var message = this.getMessage( id );
						message.hasRead = true;
					},
					archive: function( id ) {
						var messages = this.getMessages();
						var message = this.getMessage( id );
						this.setState( { messages: _.without( messages, message ) } );
					}
				},
				getMessages: function() {
					return this.getState().messages;
				},
				getMessage: function( id ) {
					var messages = this.getState().messages;
					return _.find( messages, { id: id } );
				}
			} );
	} );
