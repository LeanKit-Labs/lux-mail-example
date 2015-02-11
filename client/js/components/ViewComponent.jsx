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

	function getStateFromStores() {
		var currentId = layoutStore.getCurrentMessageId();
		return {
			loading: layoutStore.getLoading(),
			messages: messagesStore.getMessages(),
			currentMessageId: currentId,
			currentMessage: messagesStore.getMessage( currentId )
		};
	}

	return lux.controllerView({
		getActionGroup: [ "layout" ],
		displayName: "ViewComponent",
		stores: {
			listenTo: [ "messages", "layout" ],
			onChange: function () {
				this.setState( getStateFromStores() );
			}
		},
		getInitialState: function () {
			return getStateFromStores();
		},
		render: function () {
			var currentMessage = this.state.currentMessage;
			return ( <div className="app">
				<Toolbar />

				<div className="container-fluid row">
					<div className="col-sm-3">
						<MessageList
							loading={this.state.loading}
							messages={this.state.messages}
							currentMessageId={this.state.currentMessageId}
							onSelectMessage={this.selectMessage }/>
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
