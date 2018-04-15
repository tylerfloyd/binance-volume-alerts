import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Form, Dropdown, Icon, Label, Checkbox } from 'semantic-ui-react';

import { sortCoins } from '../actions/coins';
import { toggleTour, changeView } from '../actions/settings';

import { primary, secondary } from '../common/data/sortOptions';

class Menu extends Component {
	updateSorting = (event, data) => {
		const { dispatch, primarySort, secondarySort } = this.props;
		const sorting = {
			primarySort,
			secondarySort,
			[data.name]: data.value
		};

		event.preventDefault();

		dispatch.sortCoins(sorting);
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
		const { compactView, primarySort, secondarySort } = this.props;

		return (
			<Grid>
				<Grid.Row centered>
					<Form>
						<Form.Group widths="equal">
							<Form.Field>
								<Label className="startTour" as="a" color="blue" onClick={this.startTour}>
									<Icon name="question" /> Help
								</Label>
							</Form.Field>
							{!compactView && (
								<Form.Field>
									<Dropdown
										name="primarySort"
										className="primarySort"
										placeholder="Primary Sort"
										options={primary}
										value={primarySort}
										onChange={this.updateSorting}
										search
										selection
									/>
								</Form.Field>
							)}
							{!compactView && (
								<Form.Field>
									<Dropdown
										name="secondarySort"
										className="secondarySort"
										placeholder="Secondary Sort"
										options={secondary}
										value={secondarySort}
										onChange={this.updateSorting}
										search
										selection
									/>
								</Form.Field>
							)}
							<Form.Field className="compactViewToggle">
								<Checkbox label="Compact View" toggle onClick={this.changeView} />
							</Form.Field>
						</Form.Group>
					</Form>
				</Grid.Row>
			</Grid>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { coins: { sort }, settings: { compact } } = state;

	return {
		compactView: compact,
		primarySort: sort.primary,
		secondarySort: sort.secondary
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ sortCoins, toggleTour, changeView }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return { ...ownProps, ...stateProps, dispatch: dispatchProps };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Menu);
