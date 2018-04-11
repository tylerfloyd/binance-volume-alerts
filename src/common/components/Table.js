import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';
import moment from 'moment';

import { primary } from '../data/sortOptions';

export default class SortableTable extends Component {
	state = {
		column: null,
		direction: null
	};

	sortTable = sortedColumn => () => {
		const { column, direction } = this.state;

		if (column !== sortedColumn) {
			this.setState({
				column: sortedColumn,
				direction: 'ascending'
			});

			return;
		}

		this.setState({
			direction: direction === 'ascending' ? 'descending' : 'ascending'
		});
	};

	renderRow = (data, index) => {
		const positiveVolume = data.netVol > 0;
		let warning = false,
			positive = false,
			negative = false;

		/**
		 * TODO: memoize this logic for reuseability and performance
		 */
		if (data.pingCount > 0 && data.pingCount < 3 && positiveVolume) {
			// DO NOTHING
		} else if (data.pingCount > 2 && data.pingCount < 5 && positiveVolume) {
			warning = true;
		} else if ((data.pingCount > 4 && data.pingCount < 10 && positiveVolume) || positiveVolume) {
			positive = true;
		} else {
			negative = true;
		}

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
		const { column, direction } = this.props;

		return (
			<Table sortable celled fixed>
				<Table.Header>
					<Table.Row>
						{_.map(primary, sort => (
							<Table.HeaderCell sorted={column === sort.value ? direction : null} onClick={this.sortTable(sort.value)}>
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
