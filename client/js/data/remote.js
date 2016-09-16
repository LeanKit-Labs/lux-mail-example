define( [ "lux.js", "lodash" ], function( lux, _ ) {

	var messages = [
		{
			id: 1,
			hasRead: false,
			from: {
				email: "doug@dougneiner.com",
				name: "Doug Neiner"
			},
			sentAt: "Feb 11, 2015 @ 10:26AM",
			subject: "Message One",
			body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, molestiae in inventore quaerat explicabo a esse commodi quibusdam tempora dolore. Deserunt vero debitis a, officiis in itaque incidunt voluptatem fugiat."
		},
		{
			id: 2,
			hasRead: false,
			from: {
				email: "doug@dougneiner.com",
				name: "Doug Neiner"
			},
			sentAt: "Feb 11, 2015 @ 10:26AM",
			subject: "Message Two",
			body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, molestiae in inventore quaerat explicabo a esse commodi quibusdam tempora dolore. Deserunt vero debitis a, officiis in itaque incidunt voluptatem fugiat."
		},
		{
			id: 3,
			hasRead: false,
			from: {
				email: "doug@dougneiner.com",
				name: "Doug Neiner"
			},
			sentAt: "Feb 11, 2015 @ 10:26AM",
			subject: "Message Three",
			body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, molestiae in inventore quaerat explicabo a esse commodi quibusdam tempora dolore. Deserunt vero debitis a, officiis in itaque incidunt voluptatem fugiat."
		},
		{
			id: 4,
			hasRead: false,
			from: {
				email: "doug@dougneiner.com",
				name: "Doug Neiner"
			},
			sentAt: "Feb 11, 2015 @ 10:26AM",
			subject: "Message Four",
			body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, molestiae in inventore quaerat explicabo a esse commodi quibusdam tempora dolore. Deserunt vero debitis a, officiis in itaque incidunt voluptatem fugiat."
		},
		{
			id: 5,
			hasRead: false,
			from: {
				email: "doug@dougneiner.com",
				name: "Doug Neiner"
			},
			sentAt: "Feb 11, 2015 @ 10:26AM",
			subject: "Message Five",
			body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, molestiae in inventore quaerat explicabo a esse commodi quibusdam tempora dolore. Deserunt vero debitis a, officiis in itaque incidunt voluptatem fugiat."
		}
	];


	return lux.actionCreatorListener( {
		namespace: "remote",
		handlers: {
			loadPage: function() {
				_.defer( this.dispatch.bind( this, "pageInitialized" ) );
			},
			loadMessages: function() {
				setTimeout( function() {
					this.dispatch( "messagesLoaded", messages );
				}.bind( this ), 2000 );
			}
		}
	} );
} );
