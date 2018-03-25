import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from 'semantic-ui-react';

import SortingDropDown from '../common/components/Dropdown';
import ButtonGroup from '../common/components/ButtonGroup';

import { sortCoins } from '../actions/coins';

class Menu extends Component {
	render() {
		return (
			<Grid columns={2} divided>
				<Grid.Row>
					<Grid.Column>
						<SortingDropDown />
					</Grid.Column>
					<Grid.Column>
						<ButtonGroup size="large" leftText="Ascending" rightText="Descending" />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ sortCoins }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return { ...ownProps, ...stateProps, dispatch: dispatchProps };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Menu);
