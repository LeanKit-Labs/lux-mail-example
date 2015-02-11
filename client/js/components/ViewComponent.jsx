define([
	"lux.js",
	"react",
	"lodash",
	"stores/messagesStore",
	"stores/layoutStore",
	"./Toolbar.jsx",
	"./MessageList.jsx",
	"./MessageViewer.jsx"
], function ( lux, React, _, messagesStore, layoutStore, Toolbar, MessageList, MessageViewer ) {

	return lux.controllerView({
		getActionGroup: [ "layout" ],
		displayName: "ViewComponent",
		stores: {
			listenTo: [ "messages", "layout" ],
			onChange: function () {
				this.setState({
					currentMessageId: layoutStore.getCurrentMessageId(),
					messages: messagesStore.getMessages()
				});
			}
		},
		getInitialState: function () {
			return {
				currentMessageId: layoutStore.getCurrentMessageId(),
				messages: messagesStore.getMessages()
			};
		},
		render: function () {
			var currentMessage = this.state.currentMessageId ?
				_.find( this.state.messages, { id: this.state.currentMessageId } ) : null;
			return ( <div className="app">
				<Toolbar />

				<div className="container-fluid row">
					<div className="col-sm-3">
						<MessageList
							messages={this.state.messages}
							currentMessageId={this.state.currentMessageId}
							onSelectMessage={this.onSelectMessage }/>
					</div>
					<div className="col-sm-9">
						{ currentMessage ?
							<MessageViewer {...currentMessage} /> :
							<div className="well">No message selected</div>
						}
					</div>
				</div>
			</div> );
		}
	});
});
