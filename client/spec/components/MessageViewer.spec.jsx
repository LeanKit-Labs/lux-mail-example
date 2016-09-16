var MessageViewer = require( "components/MessageViewer.jsx" );
var React = require( "react" );
var ReactDOM = require( "react-dom" );
var utils = require( "react-addons-test-utils" );

var defaults = {
	subject: "Subject", body: "Body", from: { email: "me@example.com", name: "Example" }
};

describe( "MessageViewer", function () {
	var component;
	afterEach( function () {
		if ( component ) {
			ReactDOM.unmountComponentAtNode( ReactDOM.findDOMNode( component ).parentNode );
			component = null;
		}
	});
	it( "should render the subject as the title", function (){
		component = utils.renderIntoDocument( <MessageViewer {...defaults} subject="The Subject" /> );

		var title = utils.findRenderedDOMComponentWithTag( component, "h2" );
		title.textContent.should.equal( "The Subject" );
	});
	it( "should render the from as a mailto link", function () {
		component = utils.renderIntoDocument(
			<MessageViewer {...defaults}  from={{ email: "me@example.com", name: "Example User" }} />
		);

		var link = utils.findRenderedDOMComponentWithTag( component, "a" );
		link.textContent.should.equal( "Example User" );
		link.href.should.equal( "mailto:me@example.com" );
	});
	it( "should render the body", function () {
		component = utils.renderIntoDocument(
			<MessageViewer {...defaults}  body="My email body" />
		);

		var content = utils.findRenderedDOMComponentWithClass( component, "content" );
		content.textContent.should.equal( "My email body" );
	});
	it( "should not error if from is not provided", function () {
		(function() {
			component = utils.renderIntoDocument(
				<MessageViewer {...defaults} from={""} body="My email body" />
			);
		}).should.not.throw();
	});
});
