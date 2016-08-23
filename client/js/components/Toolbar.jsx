import lux from  "lux.js";
import React from  "react";
import layoutStore from  "stores/layoutStore";
import UserMenu from  "./UserMenu.jsx";
import Button from  "./Button.jsx";

export default React.createClass({
	mixins: [ lux.reactMixin.store, lux.reactMixin.actionCreator ],
	displayName: "Toolbar",
	getActions: [ "reply", "forward", "archive" ],
	stores: {
		listenTo: "layout",
		onChange: function (){
			this.setState( this.getInitialState() );
		}
	},
	getInitialState: function () {
		return {
			currentMessageId: layoutStore.getCurrentMessageId()
		};
	},
	renderActions: function () {
		var id = this.state.currentMessageId;
		var opts = !!id ? {} : { disabled: "disabled" };
		return <div className="btn-group mailActions">
			<Button onClick={this.reply.bind(this, id)} icon="mail-reply" label="Reply" {...opts} />
			<Button onClick={this.forward.bind(this, id)} icon="mail-forward" label="Forward" {...opts} />
			<Button onClick={this.archive.bind(this, id)} icon="archive" label="Archive" {...opts} />
		</div>;
	},
	render: function () {
		return (
			<nav className="navbar navbar-default">
			  <div className="container-fluid">
				<div className="navbar-header">
				  <a className="navbar-brand" href="index.html">Lux.js</a>
				</div>
				<div>
					<Button icon="edit" label="New Message" />
					{this.renderActions()}
					<ul className="nav navbar-nav navbar-right">
						<UserMenu />
					</ul>
				</div>
			  </div>
			</nav>
		);
	}
});