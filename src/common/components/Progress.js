import React, { Component } from 'react';
import { Progress } from 'semantic-ui-react';

import { determineStatus } from '../selectors/index';

export default class coinProgress extends Component {
	/**
	 * TODO: memoize this function for reuseability and performance
	 */
	getCoinStatus = (count, netVol) => {
		const positiveVolume = netVol > 0;
		return determineStatus({ count, positiveVolume });
	};

	render() {
		const { count, netVol, size = 'medium' } = this.props;
		const progressAttributes = this.getCoinStatus(count, netVol);
		return (
			<div>
				<Progress percent={progressAttributes.percent} color={progressAttributes.color} label={count} size={size} />
			</div>
		);
	}
}
