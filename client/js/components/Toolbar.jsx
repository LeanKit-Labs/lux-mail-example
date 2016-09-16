define([
	"lux.js",
	"react",
	"stores/layoutStore",
	"./UserMenu.jsx",
	"./Button.jsx"
], function ( lux, React, layoutStore, UserMenu, Button ) {
	var LuxContainer = lux.LuxContainer;
	return React.createClass({
		displayName: "Toolbar",
		getInitialState: function () {
			return {
				currentMessageId: layoutStore.getCurrentMessageId()
			};
		},
		renderActions: function () {
			var id = this.state.currentMessageId;
			var opts = !!id ? {} : { disabled: "disabled" };
			var onStoreChange = function (){
				var state = this.getInitialState();
				if( state ) {
					this.setState( state );
				}
			}.bind( this );

			return (<LuxContainer stores="layout" onStoreChange={ onStoreChange }>
				<div className="btn-group mailActions">
					<Button onClick={ lux.dispatch.bind(lux, "reply", id ) } icon="mail-reply" label="Reply" {...opts} />
					<Button onClick={ lux.dispatch.bind(lux, "forward", id ) } icon="mail-forward" label="Forward" {...opts} />
					<Button onClick={ lux.dispatch.bind(lux, "archive", id ) } icon="archive" label="Archive" {...opts} />
				</div>
			</LuxContainer>);
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
});
