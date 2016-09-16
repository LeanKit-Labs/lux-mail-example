var messagesStoreFactory = require( "amd-inject!stores/messagesStore" );
var lux = require( "lux.js" );
var actionCreator = lux.actionCreator( {} );
var _ = require( "lodash" );

var sampleMessages = [
	{ id: 1, subject: "one", hasRead: false },
	{ id: 2, subject: "two", hasRead: false },
	{ id: 3, subject: "three", hasRead: false }
];

describe( "messagesStore", function() {
	var messagesStore, messages;
	beforeEach( function() {
		messagesStore = messagesStoreFactory( {} );
		messages = _.clone( sampleMessages );
	} );
	afterEach( function() {
		if ( messagesStore ) {
			messagesStore.dispose();
			messagesStore = null;
		}
	} );

	describe( "handlers", function() {
		it( "should load messages", function() {
			actionCreator.dispatch( "messagesLoaded", messages );
			messagesStore.getMessages().should.be.an.Array.and.have.lengthOf( 3 );
		} );
		it( "should mark a message as read", function() {
			actionCreator.dispatch( "messagesLoaded", messages );
			actionCreator.dispatch( "markAsRead", 2 );
			messagesStore.getMessage( 2 ).hasRead.should.be.ok;
		} );
		it( "should archive a message", function() {
			actionCreator.dispatch( "messagesLoaded", messages );
			actionCreator.dispatch( "archive", 2 );
			( messagesStore.getMessage( 2 ) === undefined ).should.be.ok;
		} );
	} );
} );
