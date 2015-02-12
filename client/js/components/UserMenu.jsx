define([
	"react"
], function ( React ) {
	return React.createClass({
		displayName: "UserMenu",
		getInitialState: function (){
			return {
				open: false
			};
		},
		getDefaultProps: function () {
			return {
				name: "Doug Neiner",
				avatarUrl: "http://www.gravatar.com/avatar/6868c2908859c318f4fa0911eb6029b0.png?s=20"
			};
		},
		toggleOpen: function () {
			this.setState({ open: !this.state.open });
		},
		render: function () {
			var classes = "dropdown";
			if ( this.state.open ) {
				classes += " open";
			}
			return (
				<li className={ classes } onClick={this.toggleOpen}>
					<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded={this.state.open.toString()}>
						<img src={this.props.avatarUrl} className="img-circle" /> {this.props.name} <span className="caret"></span>
					</a>
					<ul className="dropdown-menu" role="menu">
						<li><a href="#">Profile</a></li>
						<li><a href="#">Reset Password</a></li>
						<li className="divider"></li>
						<li><a href="#">Log Out</a></li>
					</ul>
				</li>
			);
		}
	});
});
