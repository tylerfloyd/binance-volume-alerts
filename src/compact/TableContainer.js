import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';

import { sortCoins } from '../actions/coins';

import { determineStatus } from '../common/selectors/index';

import { primary } from '../common/data/sortOptions';

class SortableTable extends Component {
	/**
	 * TODO: move to mapStateToProps
	 */
	state = {
		primarySort: 'updated',
		secondarySort: 'desc'
	};

	sortTable = sortedColumn => () => {
		const { primarySort, secondarySort } = this.state;
		const { dispatch } = this.props;

		if (primarySort !== sortedColumn) {
			this.setState({
				primarySort: sortedColumn,
				secondarySort: 'asc'
			});

			return;
		}

		this.setState({
			secondarySort: secondarySort === 'asc' ? 'desc' : 'asc'
		});

		dispatch.sortCoins(this.state);
	};

	renderRow = (data, index) => {
		const positiveVolume = data.netVol > 0,
			status = determineStatus({
				count: data.pingCount,
				positiveVolume
			});

		let warning = false,
			positive = false,
			negative = false;

		return (
			<Table.Row key={data.coin}>
				<Table.Cell>{data.coin}</Table.Cell>
				<Table.Cell>{data.minuteVol}</Table.Cell>
				<Table.Cell>{data.netVol}</Table.Cell>
				<Table.Cell warning={warning} positive={positive} negative={negative}>
					{data.pingCount}
				</Table.Cell>
				<Table.Cell>{moment(data.updated).format('YYYY-MM-DD HH:mm:ss')}</Table.Cell>
			</Table.Row>
		);
	};

	render() {
		const { coins } = this.props;
		const { primarySort, secondarySort } = this.state;
		const translate = {
			asc: 'ascending',
			desc: 'descending'
		};

		return (
			<Table sortable celled fixed>
				<Table.Header>
					<Table.Row>
						{_.map(primary, sort => (
							<Table.HeaderCell
								key={sort.value}
								sorted={primarySort === sort.value ? translate[secondarySort] : null}
								onClick={this.sortTable(sort.value)}
							>
								{sort.text}
							</Table.HeaderCell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>{_.map(coins, (coin, index) => this.renderRow(coin, index))}</Table.Body>
			</Table>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ sortCoins }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return { ...ownProps, ...stateProps, dispatch: dispatchProps };
};

export default connect(null, mapDispatchToProps, mergeProps)(SortableTable);
