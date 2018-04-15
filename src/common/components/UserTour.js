import React, { Component } from 'react';
import Tour from 'reactour';
import { List, Button } from 'semantic-ui-react';

import Progress from './Progress';

export default class userTour extends Component {
	renderTourHTML = (header, description) => {
		return (
			<List>
				<List.Item>
					<List.Content>
						<List.Header>{header}</List.Header>
						<List.Description>{description}</List.Description>
					</List.Content>
				</List.Item>
			</List>
		);
	};
	renderPingCountDiv = () => {
		const header = <Progress count={1} netVol={1} size="small" />;
		const description = 'Grey can usually be ignored. The volume will not have started coming into the coin.';

		return (
			<div>
				<p>
					This shows number of "pings". Progress bar will be four different colors for helpful, quick glance statuses.
				</p>
				{this.renderTourHTML(header, description)}
			</div>
		);
	};

	renderYellowExample = () => {
		const header = <Progress count={3} netVol={3} size="small" />;
		const description =
			'Yellow indicates to start watching this coin. Pull up ' +
			'those charts, draw support, resistance and do not forget fibs. ' +
			'This coin might be about to run up.';

		return <div>{this.renderTourHTML(header, description)}</div>;
	};

	renderGreenExample = () => {
		const header = <Progress count={5} netVol={5} size="small" />;
		const description =
			'With a green bar, you should already have a plan for your ' +
			'entry and exit and is potentially a good time to enter.';

		return <div>{this.renderTourHTML(header, description)}</div>;
	};

	renderRedExample = () => {
		const header = <Progress count={8} netVol={-8} size="small" />;
		const description =
			'A red bar is going to indicate that this coin is ' +
			'overextended and ready to drop. A sell in this status is reccomended. ' +
			'You should already have decent profits by now.';

		return <div>{this.renderTourHTML(header, description)}</div>;
	};

	renderTourEnded = closeTour => {
		return (
			<div>
				<p>
					This site is <b>not</b> investment advise and is merely a tool to catch bull runs more easily and earlier.
					Please submit feedback and offer suggestions via the "Feedback" button on the right hand side.
				</p>
				<Button onClick={closeTour}>Done</Button>
			</div>
		);
	};

	render() {
		const { tourOpen, closeTour, compactView } = this.props;
		const text = {
			link: 'Each coin links off to its Binance chart.',
			minuteVol: 'Cumulative volume in BTC for the last minute.',
			netVol: 'Cumulative volume in BTC for the last hour (this is important watch).',
			update: 'Time of last update in your local time zone.'
		};

		const cardSteps = [
			{
				selector: '.primarySort input',
				content: 'Primary sorting with predefined sorting options that automagically applies at the time of selection.'
			},
			{
				selector: '.secondarySort input',
				content: 'Secondary is limited to ascending or descending and automagically applies at time of selection'
			},
			{
				selector: '.coin_0',
				content: 'This is your coin card. Each coin will have its own card with relevant data in it.'
			},
			{
				selector: '.coin_0 .coinHeader a',
				content: text.link
			},
			{
				selector: '.coin_0 .lastUpdate',
				content: text.update
			},
			{
				selector: '.coin_0 .minuteVolume',
				content: text.minuteVol
			},
			{
				selector: '.coin_0 .hourlyVolume',
				content: text.netVol
			},
			{
				selector: '.coin_0 .pingCount',
				content: () => this.renderPingCountDiv()
			},
			{
				selector: '.coin_0 .pingCount',
				content: () => this.renderYellowExample()
			},
			{
				selector: '.coin_0 .pingCount',
				content: () => this.renderGreenExample()
			},
			{
				selector: '.coin_0 .pingCount',
				content: () => this.renderRedExample()
			},
			{
				selector: '.cards',
				content: () => this.renderTourEnded(closeTour)
			}
		];

		const tableSteps = [
			{
				selector: 'tr.coin_0 td:first-child',
				content: text.link
			},
			{
				selector: 'tr.coin_0 td:nth-child(2)',
				content: text.minuteVol
			},
			{
				selector: 'tr.coin_0 td:nth-child(3)',
				content: text.netVol
			},
			{
				selector: 'tr.coin_0 td:nth-child(4)',
				content: () => this.renderPingCountDiv()
			},
			{
				selector: 'tr.coin_0 td:nth-child(4)',
				content: () => this.renderYellowExample()
			},
			{
				selector: 'tr.coin_0 td:nth-child(4)',
				content: () => this.renderGreenExample()
			},
			{
				selector: 'tr.coin_0 td:nth-child(4)',
				content: () => this.renderRedExample()
			},
			{
				selector: 'tr.coin_0 td:nth-child(5)',
				content: text.update
			},
			{
				selector: '.coinTable',
				content: () => this.renderTourEnded(closeTour)
			}
		];

		return (
			<Tour
				steps={compactView ? tableSteps : cardSteps}
				isOpen={tourOpen}
				onRequestClose={closeTour}
				showNumber={false}
			/>
		);
	}
}
