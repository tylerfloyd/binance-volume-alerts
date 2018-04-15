import React, { Component } from 'react';

class Loading extends Component {
	componentWillReceiveProps(nextProps) {
		const { pendingCoins, time } = this.props;

		if (pendingCoins && !nextProps.pendingCoins) {
			setTimeout(() => {
				document.getElementById('preloader').classList.add('close');
			}, time);
		}
	}

	render() {
		const { backgroundColor, color } = this.props;
		return (
			<div style={{ backgroundColor: backgroundColor }} ref={'preload'} id={'preloader'}>
				<div id="loader">
					<ul>
						<li style={{ backgroundColor: color }} />
						<li style={{ backgroundColor: color }} />
						<li style={{ backgroundColor: color }} />
						<li style={{ backgroundColor: color }} />
						<li style={{ backgroundColor: color }} />
						<li style={{ backgroundColor: color }} />
					</ul>
				</div>
			</div>
		);
	}
}

Loading.defaultProps = { time: 2000, backgroundColor: '#f9fafb', color: '#2ecc71', pendingCoins: false };

export default Loading;
