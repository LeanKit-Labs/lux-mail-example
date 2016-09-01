import React from "react";
import classNames from "classnames";

export default React.createClass({
	displayName: "MessageList",
	getDefaultProps: function () {
		return {
			currentMessageId: null,
			messages: [],
			loading: false
		};
	},
	onClick: function ( id, e ){
		e.preventDefault();
		this.props.onSelectMessage( id );
	},
	renderMessages: function () {
		return this.props.messages.map( function ( message ) {
			var text = message.body.length > 50 ? message.body.substr(0,50) + "..." : message.body;
			var classes = classNames({
				"list-group-item": true,
				"active": message.id === this.props.currentMessageId
			});
			return <a key={"message-" + message.id}
					  href={"/message/" + message.id }
					  onClick={this.onClick.bind( this, message.id)}
					  className={classes}>
					<h4 className="list-group-item-heading">
						{ message.hasRead ? null : <i className="unreadIcon fa fa-circle"></i> } {message.subject}
					</h4>
					<p className="list-group-item-text">{text}</p>
				</a>;
		}, this	);
	},
	renderLoading: function () {
		return <div className="well">
			<i className="fa fa-spin fa-spinner"></i> Loading messages…
		</div>;
	},
	render: function () {
		return (
			<div className="list-group">
				{ this.props.loading ? this.renderLoading() : this.renderMessages() }
			</div>
		);
	}
});
