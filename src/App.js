import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Card } from 'semantic-ui-react';
import _ from 'lodash';
import ReactGA from 'react-ga';

import { getCoins } from './actions/coins';
import { toggleTour } from './actions/settings';

import MenuContainer from './menu/MenuContainer';
import TableContainer from './compact/TableContainer';
import Coin from './common/components/Card';
import UserTour from './common/components/UserTour';

class App extends Component {
	componentWillMount() {
		/**
		 * When we know we are good to go,
		 * call into Firebase to get the coins
		 */
		this.props.dispatch.getCoins();
		ReactGA.initialize('UA-116367609-1');
		ReactGA.ga('send', 'pageview', 'home');
	}

	/**
	 * Component function that will build out the card elements
	 */
	renderCoins = (data, index) => {
		if (data.updated) {
			return <Coin key={data.coin} data={data} coin={data.coin} index={index} />;
		} else {
			return null;
		}
	};

	closeTour = () => {
		const { dispatch } = this.props;
		dispatch.toggleTour();
	};

	render() {
		const { coins, settings: { tourOpen = false, compact = false } } = this.props;

		return (
			<div className="App">
				<Container>
					<MenuContainer compactView={compact} />
				</Container>
				<Container>
					{!compact && (
						<Card.Group centered>{_.map(coins.list, (coin, index) => this.renderCoins(coin, index))}</Card.Group>
					)}
					{compact && <TableContainer coins={coins.list} />}
				</Container>
				<UserTour closeTour={this.closeTour} tourOpen={tourOpen} />
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	return state;
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ getCoins, toggleTour }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return { ...ownProps, ...stateProps, dispatch: dispatchProps };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
