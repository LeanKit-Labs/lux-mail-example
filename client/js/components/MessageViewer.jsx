import React from "react";
export default React.createClass({
	displayName: "MessageViewer",
	render: function () {
		var from = this.props.from || {};
		return (
			<div className="messageViewer">
				<h2>{this.props.subject}</h2>

				<div>
					<p><strong>From:</strong> <a href={"mailto:" + from.email}>{ from.name }</a></p>
					<p><strong>Sent:</strong> {this.props.sentAt}</p>
				</div>

				<hr />

				<div className="content">
					<p>{this.props.body }</p>
				</div>
			</div>
		);
	}
});