define([
	"lux.js",
	"react",
	"stores/layoutStore",
	"./UserMenu.jsx"
], function ( lux, React, layoutStore, UserMenu ) {
	return lux.controllerView({
		displayName: "Toolbar",
		getActions: [ "reply", "forward", "archive" ],
		stores: {
			listenTo: "layout",
			onChange: function (){
				this.setState({
					currentMessageId: layoutStore.getCurrentMessageId()
				});
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
				<button type="button" onClick={this.reply.bind(this, id)} className="btn btn-default navbar-btn" {...opts}>
					<i className="fa fa-mail-reply"></i> Reply
				</button>
				<button type="button" onClick={this.forward.bind(this, id)} className="btn btn-default navbar-btn" {...opts}>
					<i className="fa fa-mail-forward"></i> Forward
				</button>
				<button type="button" onClick={this.archive.bind(this, id)} className="btn btn-default navbar-btn" {...opts}>
					<i className="fa fa-archive"></i> Archive
				</button>
			</div>;
		},
		render: function () {
			return ( <nav className="navbar navbar-default">
				  <div className="container-fluid">
					<div className="navbar-header">
					  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#lux-navbar-collapse-1">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					  </button>
					  <a className="navbar-brand" href="#">Lux.js</a>
					</div>


					<div className="collapse navbar-collapse" id="lux-navbar-collapse-1">
						<button type="button" className="btn btn-default navbar-btn">
							<i className="fa fa-edit"></i> New Message
						</button>
						{this.renderActions()}
						<ul className="nav navbar-nav navbar-right">
							<UserMenu />
						</ul>
					</div>
				  </div>
				</nav> );
		}
	});
});
