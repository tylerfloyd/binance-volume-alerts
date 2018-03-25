import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Card } from 'semantic-ui-react';
import _ from 'lodash';

import './App.css';

import { getCoins } from './actions/coins';

import Coin from './components/Card';
import FilterMenu from './components/FilterMenu';

class App extends Component {
  componentWillMount() {
    /**
     * When we know we are good to go,
     * call into Firebase to get the coins
     */
    this.props.dispatch.getCoins();
  }

  /**
   * Component function that will build out the card elements
   */
  renderCoins = (data, coin) => {
    if (data.updated) {
      return <Coin key={data.coin} data={data} coin={data.coin} />;
    } else {
      return null;
    }
  };

  render() {
    const { coins } = this.props;

    return (
      <div className="App">
        <Container>
          <FilterMenu />
        </Container>
        <Container>
          <Card.Group centered>
            {_.map(coins, (data, coin) => this.renderCoins(data, coin))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getCoins }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return { ...ownProps, ...stateProps, dispatch: dispatchProps };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
