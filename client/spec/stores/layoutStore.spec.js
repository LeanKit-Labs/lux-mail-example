import layoutStoreFactory from "inject!stores/layoutStore";
import lux from "lux.js";
var actionCreator = lux.actionCreator( {} );

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
			actionCreator.publishAction( "loadMessages" );
			layoutStore.getLoading().should.be.ok;
		} );
		it( "should flag as not loading after messagesLoaded", function() {
			actionCreator.publishAction( "loadMessages" );
			layoutStore.getLoading().should.be.ok;
			actionCreator.publishAction( "messagesLoaded", [] );
			layoutStore.getLoading().should.not.be.ok;
		} );
		it( "should select the first message during the initial messagesLoaded", function() {
			actionCreator.publishAction( "messagesLoaded", [ { id: 5 } ] );
			layoutStore.getCurrentMessageId().should.equal( 5 );
			actionCreator.publishAction( "messagesLoaded", [ { id: 10 } ] );
			layoutStore.getCurrentMessageId().should.equal( 5 );
		} );
		it( "should select a message via selectMessage if not already selected", function() {
			actionCreator.publishAction( "selectMessage", 1 );
			layoutStore.getCurrentMessageId().should.equal( 1 );

			actionCreator.publishAction( "selectMessage", 2 );
			layoutStore.getCurrentMessageId().should.equal( 2 );
		} );
		it( "should deselect a message via selectMessage if already selected", function() {
			actionCreator.publishAction( "selectMessage", 1 );
			layoutStore.getCurrentMessageId().should.equal( 1 );

			actionCreator.publishAction( "selectMessage", 1 );
			( layoutStore.getCurrentMessageId() === null ).should.be.ok;
		} );
		it( "should deselect a message when archive is called", function() {
			actionCreator.publishAction( "selectMessage", 1 );
			layoutStore.getCurrentMessageId().should.equal( 1 );

			actionCreator.publishAction( "archive", 1 );
			( layoutStore.getCurrentMessageId() === null ).should.be.ok;
		} );
	} );
} );
