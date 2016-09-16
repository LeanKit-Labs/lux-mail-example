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

	var LuxContainer = lux.LuxContainer;

	function getStateFromStores() {
		var currentId = layoutStore.getCurrentMessageId();
		return {
			loading: layoutStore.getLoading(),
			messages: messagesStore.getMessages(),
			currentMessageId: currentId,
			currentMessage: messagesStore.getMessage( currentId )
		};
	}

	return React.createClass({
		displayName: "ViewComponent",
		getInitialState: function () {
			return getStateFromStores();
		},
		render: function () {
			var currentMessage = this.state.currentMessage;
			var onChangeHandler = function () {
				this.setState( getStateFromStores() );
			}.bind( this );
			return (
				<LuxContainer stores="messages, layout" onStoreChange={ onChangeHandler }>
					<div className="app">
						<Toolbar />
						<div className="container-fluid row">
							<div className="col-sm-3">
								<LuxContainer actions={ { onSelectMessage: "selectMessage" } }>
								<MessageList
									loading={this.state.loading}
									messages={this.state.messages}
									currentMessageId={this.state.currentMessageId}/>
								</LuxContainer>
							</div>
							<div className="col-sm-9">
								{ currentMessage ?
									<MessageViewer {...currentMessage} /> :
									<div className="well">No message selected</div>
								}
							</div>
						</div>
					</div>
				</LuxContainer>
			);
		}
	});
});
