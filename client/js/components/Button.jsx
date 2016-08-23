import React from "react";
export default React.createClass( {
	displayName: "Button",
	getDefaultProps: function () {
		return {
			icon: "circle",
			label: ""
		};
	},
	render: function () {
		return <button
					type="button"
					className="btn btn-default navbar-btn"
					onClick={this.props.onClick}
					disabled={this.props.disabled}>
				<i className={ `fa fa-${ this.props.icon}` }></i> { this.props.label }
			</button>;
	}
} );