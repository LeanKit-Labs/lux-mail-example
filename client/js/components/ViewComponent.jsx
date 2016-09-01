import lux from "lux.js";
import React from "react";
import _ from "lodash";
import messagesStore from "stores/messagesStore";
import layoutStore from "stores/layoutStore";
import Toolbar from "./Toolbar.jsx";
import MessageList from "./MessageList.jsx";
import MessageViewer from "./MessageViewer.jsx";

function getStateFromStores() {
	var currentId = layoutStore.getCurrentMessageId();
	return {
		loading: layoutStore.getLoading(),
		messages: messagesStore.getMessages(),
		currentMessageId: currentId,
		currentMessage: messagesStore.getMessage( currentId )
	};
}

export default React.createClass({
	mixins: [ lux.reactMixin.store, lux.reactMixin.actionCreator ],
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