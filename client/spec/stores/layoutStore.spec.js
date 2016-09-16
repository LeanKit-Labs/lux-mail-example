var layoutStoreFactory = require( "amd-inject!stores/layoutStore" );
var actionCreator = require( "lux.js" ).actionCreator( {} );

describe( "layoutStore", function() {
	var layoutStore;
	beforeEach( function() {
		layoutStore = layoutStoreFactory( {} );
	} );
	afterEach( function() {
		if ( layoutStore ) {
			layoutStore.dispose();
			layoutStore = null;
		}
	} );

	describe( "handlers", function() {
		it( "should flag as loading after loadMessages", function() {
			actionCreator.dispatch( "loadMessages" );
			layoutStore.getLoading().should.be.ok;
		} );
		it( "should flag as not loading after messagesLoaded", function() {
			actionCreator.dispatch( "loadMessages" );
			layoutStore.getLoading().should.be.ok;
			actionCreator.dispatch( "messagesLoaded", [] );
			layoutStore.getLoading().should.not.be.ok;
		} );
		it( "should select the first message during the initial messagesLoaded", function() {
			actionCreator.dispatch( "messagesLoaded", [ { id: 5 } ] );
			layoutStore.getCurrentMessageId().should.equal( 5 );
			actionCreator.dispatch( "messagesLoaded", [ { id: 10 } ] );
			layoutStore.getCurrentMessageId().should.equal( 5 );
		} );
		it( "should select a message via selectMessage if not already selected", function() {
			actionCreator.dispatch( "selectMessage", 1 );
			layoutStore.getCurrentMessageId().should.equal( 1 );

			actionCreator.dispatch( "selectMessage", 2 );
			layoutStore.getCurrentMessageId().should.equal( 2 );
		} );
		it( "should deselect a message via selectMessage if already selected", function() {
			actionCreator.dispatch( "selectMessage", 1 );
			layoutStore.getCurrentMessageId().should.equal( 1 );

			actionCreator.dispatch( "selectMessage", 1 );
			( layoutStore.getCurrentMessageId() === null ).should.be.ok;
		} );
		it( "should deselect a message when archive is called", function() {
			actionCreator.dispatch( "selectMessage", 1 );
			layoutStore.getCurrentMessageId().should.equal( 1 );

			actionCreator.dispatch( "archive", 1 );
			( layoutStore.getCurrentMessageId() === null ).should.be.ok;
		} );
	} );
} );
