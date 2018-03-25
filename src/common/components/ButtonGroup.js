import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

export default class ButtonGroup extends Component {
	render() {
		const { size, leftText, rightText } = this.props;

		return (
			<Button.Group size={size}>
				<Button>{leftText}</Button>
				<Button.Or />
				<Button>{rightText}</Button>
			</Button.Group>
		);
	}
}
