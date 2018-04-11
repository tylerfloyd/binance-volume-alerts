import React, { Component } from 'react';
import { Progress } from 'semantic-ui-react';

export default class coinProgress extends Component {
	getPercent = (count, netVol) => {
		const positiveVolume = netVol > 0;
		let result = {
			percent: 0,
			color: 'red'
		};

		if (count > 0 && count < 3 && positiveVolume) {
			result.percent = 25;
			result.color = 'orange';
		} else if (count > 2 && count < 5 && positiveVolume) {
			result.percent = 50;
			result.color = 'yellow';
		} else if ((count > 4 && count < 10 && positiveVolume) || positiveVolume) {
			result.percent = 75;
			result.color = 'green';
		} else {
			result.percent = 100;
			result.color = 'red';
		}

		return result;
	};
	render() {
		const { count, netVol, size = 'medium' } = this.props;
		const progressAttributes = this.getPercent(count, netVol);
		return (
			<div>
				<Progress percent={progressAttributes.percent} color={progressAttributes.color} label={count} size={size} />
			</div>
		);
	}
}
