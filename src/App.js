import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Card } from 'semantic-ui-react';
import _ from 'lodash';
import ReactGA from 'react-ga';

import './App.css';

import { getCoins } from './actions/coins';
import { toggleTour } from './actions/settings';

import Coin from './common/components/Card';
import MenuContainer from './menu/MenuContainer';
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
		const { coins, settings: { tourOpen } } = this.props;

		return (
			<div className="App">
				<Container>
					<MenuContainer />
				</Container>
				<Container>
					<Card.Group centered>{_.map(coins, (data, coin) => this.renderCoins(data, coin))}</Card.Group>
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
