define( [
	"lux.js",
	"lodash"
], function( lux, _ ) {
		return new lux.Store( {
				namespace: "messages",
				state: {
					messages: {
						1: {
							id: 1,
							from: {
								email: "doug@dougneiner.com",
								name: "Doug Neiner"
							},
							sentAt: "Feb 11, 2015 @ 10:26AM",
							subject: "Message One",
							body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, molestiae in inventore quaerat explicabo a esse commodi quibusdam tempora dolore. Deserunt vero debitis a, officiis in itaque incidunt voluptatem fugiat."
						},
						2: {
							id: 2,
							from: {
								email: "doug@dougneiner.com",
								name: "Doug Neiner"
							},
							sentAt: "Feb 11, 2015 @ 10:26AM",
							subject: "Message Two",
							body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, molestiae in inventore quaerat explicabo a esse commodi quibusdam tempora dolore. Deserunt vero debitis a, officiis in itaque incidunt voluptatem fugiat."
						},
						3: {
							id: 3,
							from: {
								email: "doug@dougneiner.com",
								name: "Doug Neiner"
							},
							sentAt: "Feb 11, 2015 @ 10:26AM",
							subject: "Message Three",
							body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, molestiae in inventore quaerat explicabo a esse commodi quibusdam tempora dolore. Deserunt vero debitis a, officiis in itaque incidunt voluptatem fugiat."
						},
						4: {
							id: 4,
							from: {
								email: "doug@dougneiner.com",
								name: "Doug Neiner"
							},
							sentAt: "Feb 11, 2015 @ 10:26AM",
							subject: "Message Four",
							body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, molestiae in inventore quaerat explicabo a esse commodi quibusdam tempora dolore. Deserunt vero debitis a, officiis in itaque incidunt voluptatem fugiat."
						},
						5: {
							id: 5,
							from: {
								email: "doug@dougneiner.com",
								name: "Doug Neiner"
							},
							sentAt: "Feb 11, 2015 @ 10:26AM",
							subject: "Message Five",
							body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, molestiae in inventore quaerat explicabo a esse commodi quibusdam tempora dolore. Deserunt vero debitis a, officiis in itaque incidunt voluptatem fugiat."
						}
					}
				},
				handlers: {
					messagesLoaded: function() {},
					archive: function( id ) {
						var messages = this.getState().messages;
						delete messages[ id ];
						this.setState( { messages: messages } );
					}
				},
				getMessages: function() {
					return _.values( this.getState().messages || {} );
				},
				getMessage: function( id ) {
					var messages = this.getState().messages;
					return messages[ id ];
				}
			} );
	} );
