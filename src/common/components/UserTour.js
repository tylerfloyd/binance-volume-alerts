import React, { Component } from 'react';
import Tour from 'reactour';
import { List, Button } from 'semantic-ui-react';

import Progress from './Progress';

export default class userTour extends Component {
	render() {
		const { tourOpen, closeTour } = this.props;

		const steps = [
			{
				selector: '.primarySort input',
				content: 'Primary sorting with predefined sorting options.'
			},
			{
				selector: '.secondarySort input',
				content: 'Secondary is limited to ascending or descending.'
			},
			{
				selector: '.sortingAction',
				content: 'Do not forget to submit your sorting.'
			},
			{
				selector: '.coin_0',
				content: 'This is your coin card. Each coin will have its own card with relevant data in it.'
			},
			{
				selector: '.coin_0 .coinHeader a',
				content: 'Each coin links off to its Binance chart.'
			},
			{
				selector: '.coin_0 .lastUpdate',
				content: 'Time of last update in your local time zone.'
			},
			{
				selector: '.coin_0 .minuteVolume',
				content: 'Cumulative volume in BTC for the last minute.'
			},
			{
				selector: '.coin_0 .hourlyVolume',
				content: 'Cumulative volume in BTC for the last hour (this is important watch).'
			},
			{
				selector: '.coin_0 .pingCount',
				content: () => (
					<div>
						<p>
							This shows number of "pings". Progress bar will be four different colors for helpful, quick glance
							statuses.
						</p>
						<List>
							<List.Item>
								<List.Content>
									<List.Header>
										<Progress count={1} netVol={1} size="small" />
									</List.Header>
									<List.Description>
										Grey can usually be ignored. The volume will not have started coming into the coin.
									</List.Description>
								</List.Content>
							</List.Item>
						</List>
					</div>
				)
			},
			{
				selector: '.coin_0 .pingCount',
				content: () => (
					<div>
						<List>
							<List.Item>
								<List.Content>
									<List.Header>
										<Progress count={3} netVol={3} size="small" />
									</List.Header>
									<List.Description>
										Yellow indicates to start watching this coin. Pull up those charts, draw support, resistance and do
										not forget fibs. This coin might be about to run up.
									</List.Description>
								</List.Content>
							</List.Item>
						</List>
					</div>
				)
			},
			{
				selector: '.coin_0 .pingCount',
				content: () => (
					<div>
						<List>
							<List.Item>
								<List.Content>
									<List.Header>
										<Progress count={5} netVol={5} size="small" />
									</List.Header>
									<List.Description>
										With a green bar, you should already have a plan for your entry and exit and is potentially a good
										time to enter.
									</List.Description>
								</List.Content>
							</List.Item>
						</List>
					</div>
				)
			},
			{
				selector: '.coin_0 .pingCount',
				content: () => (
					<div>
						<List>
							<List.Item>
								<List.Content>
									<List.Header>
										<Progress count={8} netVol={-8} size="small" />
									</List.Header>
									<List.Description>
										A red bar is going to indicate that this coin is overextended and ready to drop. A sell in this
										status is reccomended. You should already have decent profits by now.
									</List.Description>
								</List.Content>
							</List.Item>
						</List>
					</div>
				)
			},
			{
				selector: '.cards',
				content: () => (
					<div>
						<p>
							This site is <b>not</b> investment advise and is merely a tool to catch bull runs more easily and earlier.
							Please submit feedback and offer suggestions via the "Feedback" button on the right hand side.
						</p>
						<Button onClick={closeTour}>Done</Button>
					</div>
				)
			}
		];

		return <Tour steps={steps} isOpen={tourOpen} onRequestClose={closeTour} showNumber={false} />;
	}
}
