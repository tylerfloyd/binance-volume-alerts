import React, { Component } from 'react';
import { Card, Table } from 'semantic-ui-react';
import numeral from 'numeral';
import moment from 'moment';

import Progress from './Progress';

export default class Coin extends Component {
	render() {
		const {
			coin,
			data: { minuteVol, minuteVolPercent, netVol, netVolPercent, pingCount, updated },
			index
		} = this.props;

		/* Convert UTC to Local time */
		const localTime = moment(updated).format('YYYY-MM-DD HH:mm:ss');

		return (
			<Card className={`coin_` + index}>
				<Card.Content>
					<Card.Header className="coinHeader">
						<a href={'https://www.binance.com/trade.html?symbol=' + coin + '_BTC'} target="_blank" rel="noopener">
							{coin}
						</a>
					</Card.Header>
					<Card.Meta className="lastUpdate">Update: {localTime}</Card.Meta>
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
								<Table.Row className="minuteVolume">
									<Table.Cell>Minute</Table.Cell>
									<Table.Cell>{numeral(minuteVol).format('0.00')}</Table.Cell>
									<Table.Cell>{minuteVolPercent}</Table.Cell>
								</Table.Row>
								<Table.Row className="hourlyVolume">
									<Table.Cell>Hourly</Table.Cell>
									<Table.Cell>{numeral(netVol).format('0.00')}</Table.Cell>
									<Table.Cell>{netVolPercent}</Table.Cell>
								</Table.Row>
							</Table.Body>
							<Table.Footer>
								<Table.Row className="pingCount">
									<Table.HeaderCell colSpan="3">
										<Progress count={pingCount} netVol={netVol} />
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
						</Table>
					</Card.Description>
				</Card.Content>
			</Card>
		);
	}
}
