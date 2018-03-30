import React, { Component } from 'react';
import { Card, Table } from 'semantic-ui-react';
import numeral from 'numeral';
import moment from 'moment';

export default class Coin extends Component {
	render() {
		const { coin, data } = this.props;

		/* Convert UTC to Local time */
		const localTime = moment(data.updated).format('YYYY-MM-DD HH:mm:ss');

		return (
			<Card>
				<Card.Content>
					<Card.Header>
						<a href={'https://www.binance.com/trade.html?symbol=' + coin + '_BTC'} target="_blank" rel="noopener">
							{coin}
						</a>
					</Card.Header>
					<Card.Meta>Update: {localTime}</Card.Meta>
					<Card.Description>
						<Table celled>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Time</Table.HeaderCell>
									<Table.HeaderCell>Vol</Table.HeaderCell>
									<Table.HeaderCell>Vol %</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row>
									<Table.Cell>Minute</Table.Cell>
									<Table.Cell>{numeral(data.minuteVol).format('0.00')}</Table.Cell>
									<Table.Cell>{data.minuteVolPercent}</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell>Hourly</Table.Cell>
									<Table.Cell>{numeral(data.netVol).format('0.00')}</Table.Cell>
									<Table.Cell>{data.netVolPercent}</Table.Cell>
								</Table.Row>
							</Table.Body>
							<Table.Footer>
								<Table.Row>
									<Table.HeaderCell colSpan="2">Pings</Table.HeaderCell>
									<Table.HeaderCell colSpan="1">{data.pingCount}</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
						</Table>
					</Card.Description>
				</Card.Content>
			</Card>
		);
	}
}
