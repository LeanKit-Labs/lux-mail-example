import messagesStoreFactory from "inject!stores/messagesStore";
import lux from "lux.js";
const actionCreator = lux.actionCreator( {} );
import _ from "lodash";

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
			actionCreator.publishAction( "messagesLoaded", messages );
			messagesStore.getMessages().should.be.an.Array.and.have.lengthOf( 3 );
		} );
		it( "should mark a message as read", function() {
			actionCreator.publishAction( "messagesLoaded", messages );
			actionCreator.publishAction( "markAsRead", 2 );
			messagesStore.getMessage( 2 ).hasRead.should.be.ok;
		} );
		it( "should archive a message", function() {
			actionCreator.publishAction( "messagesLoaded", messages );
			actionCreator.publishAction( "archive", 2 );
			( messagesStore.getMessage( 2 ) === undefined ).should.be.ok;
		} );
	} );
} );
