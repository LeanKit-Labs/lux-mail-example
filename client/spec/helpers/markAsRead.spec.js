import markAsReadFactory from "inject!helpers/markAsRead";
import _ from "lodash";
import sinon from "sinon";

describe( "markAsRead", function() {
	var layoutStore;
	var markAsRead;

	before( function() {
		markAsRead = markAsReadFactory( {
			"lodash": {
				debounce: function( cb ) {
					// Shorten debounce to 3 ms
					return _.debounce.call( this, cb, 3 );
				}
			},
			"stores/layoutStore": {}
		} );

		markAsRead.publishAction = sinon.stub();
	} );

	beforeEach( function() {
		markAsRead.publishAction.reset();
	} );

	after( function() {
		markAsRead.luxCleanup();
	} );

	it( "should publish mark as read with the most recent id after debouncing", function( done ) {
		markAsRead.debouncedMark( 1 );
		markAsRead.debouncedMark( 2 );
		markAsRead.debouncedMark( 3 );

		setTimeout( function() {
			markAsRead.publishAction.calledOnce.should.be.ok;
			markAsRead.publishAction.calledWith( "markAsRead", 3 ).should.be.ok;
			done();
		}, 5 );
	} );

	it( "should not publish anything if a message is deselected as the last action", function( done ) {
		markAsRead.debouncedMark( 1 );
		markAsRead.debouncedMark( 2 );
		markAsRead.debouncedMark( null );

		setTimeout( function() {
			markAsRead.publishAction.callCount.should.equal( 0 );
			done();
		}, 5 );
	} );
} );
