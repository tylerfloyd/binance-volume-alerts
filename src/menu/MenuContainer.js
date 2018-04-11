import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Form, Dropdown, Icon, Label, Checkbox } from 'semantic-ui-react';

import { sortCoins } from '../actions/coins';
import { toggleTour, changeView } from '../actions/settings';

import { primary, secondary } from '../common/data/sortOptions';

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			primarySort: 'updated',
			secondarySort: 'desc'
		};
	}

	sortingSelection = (event, { name, value }) => this.setState({ [name]: value });

	updateSorting = event => {
		const { dispatch } = this.props;
		event.preventDefault();
		dispatch.sortCoins(this.state);
	};

	startTour = event => {
		const { dispatch } = this.props;
		event.preventDefault();
		dispatch.toggleTour();
	};

	changeView = event => {
		const { dispatch } = this.props;
		event.preventDefault();
		dispatch.changeView();
	};

	render() {
		return (
			<Grid>
				<Grid.Row centered>
					<Form onSubmit={this.updateSorting}>
						<Form.Group widths="equal">
							<Form.Field>
								<Label className="startTour" as="a" color="blue" onClick={this.startTour}>
									<Icon name="question" /> Help
								</Label>
							</Form.Field>
							<Form.Field>
								<Dropdown
									name="primarySort"
									className="primarySort"
									placeholder="Primary Sort"
									options={primary}
									onChange={this.sortingSelection}
									value={this.state.primarySort}
									search
									selection
								/>
							</Form.Field>
							<Form.Field>
								<Dropdown
									name="secondarySort"
									className="secondarySort"
									placeholder="Secondary Sort"
									options={secondary}
									onChange={this.sortingSelection}
									value={this.state.secondarySort}
									search
									selection
								/>
							</Form.Field>
							<Form.Button className="sortingAction" content="Sort" />
							<Form.Field>
								<Checkbox label="Compact View" toggle onClick={this.changeView} />
							</Form.Field>
						</Form.Group>
					</Form>
				</Grid.Row>
			</Grid>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ sortCoins, toggleTour, changeView }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return { ...ownProps, ...stateProps, dispatch: dispatchProps };
};

export default connect(null, mapDispatchToProps, mergeProps)(Menu);
