import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Form, Dropdown } from 'semantic-ui-react';

import { sortCoins } from '../actions/coins';

import { primary, secondary } from '../common/data/sortOptions';

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			primarySort: 'updated',
			secondarySort: 'desc'
		};
	}

	handleChange = (event, { name, value }) => this.setState({ [name]: value });

	handleSorting = event => {
		const { dispatch } = this.props;
		event.preventDefault();
		dispatch.sortCoins(this.state);
	};

	render() {
		return (
			<Grid>
				<Grid.Row centered>
					<Form onSubmit={this.handleSorting}>
						<Form.Group widths="equal">
							<Form.Field>
								<Dropdown
									name="primarySort"
									placeholder="Primary Sort"
									options={primary}
									onChange={this.handleChange}
									value={this.state.primarySort}
									search
									selection
								/>
							</Form.Field>
							<Form.Field>
								<Dropdown
									name="secondarySort"
									placeholder="Secondary Sort"
									options={secondary}
									onChange={this.handleChange}
									value={this.state.secondarySort}
									search
									selection
								/>
							</Form.Field>
							<Form.Button content="Sort" />
						</Form.Group>
					</Form>
				</Grid.Row>
			</Grid>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ sortCoins }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return { ...ownProps, ...stateProps, dispatch: dispatchProps };
};

export default connect(null, mapDispatchToProps, mergeProps)(Menu);
