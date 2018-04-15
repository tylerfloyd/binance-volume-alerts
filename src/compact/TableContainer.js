import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';

import { sortCoins } from '../actions/coins';

import { determineStatus, getBinanceLink } from '../common/selectors/index';

import { primary } from '../common/data/sortOptions';

class SortableTable extends Component {
	sortTable = sortedColumn => () => {
		const { secondarySort } = this.props;
		const { dispatch } = this.props;
		const sorting = {
			primarySort: sortedColumn,
			secondarySort: secondarySort === 'asc' ? 'desc' : 'asc'
		};

		dispatch.sortCoins(sorting);
	};

	renderRow = (data, index) => {
		const positiveVolume = data.netVol > 0,
			status = determineStatus({
				count: data.pingCount,
				positiveVolume
			});

		return (
			<Table.Row key={data.coin} className={`coin_` + index}>
				<Table.Cell>
					<a href={getBinanceLink(data.coin)} target="_blank" rel="noopener">
						{data.coin}
					</a>
				</Table.Cell>
				<Table.Cell>{data.minuteVol}</Table.Cell>
				<Table.Cell>{data.netVol}</Table.Cell>
				<Table.Cell className={status.color}>{data.pingCount}</Table.Cell>
				<Table.Cell>{moment(data.updated).format('YYYY-MM-DD HH:mm:ss')}</Table.Cell>
			</Table.Row>
		);
	};

	render() {
		const { coins, primarySort, secondarySort } = this.props;
		const translate = {
			asc: 'ascending',
			desc: 'descending'
		};

		return (
			<Table className="coinTable" sortable celled fixed>
				<Table.Header>
					<Table.Row>
						{_.map(primary, sort => (
							<Table.HeaderCell
								className={sort.value}
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

const mapStateToProps = (state, ownProps) => {
	const { coins: { sort, list } } = state;

	return {
		coins: list,
		primarySort: sort.primary,
		secondarySort: sort.secondary
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ sortCoins }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return { ...ownProps, ...stateProps, dispatch: dispatchProps };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SortableTable);
