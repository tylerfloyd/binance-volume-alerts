import React, { Component } from 'react';
import { Container, Card } from 'semantic-ui-react';
import _ from 'lodash';
import firebase from 'firebase';

import './App.css';
import { firebaseConfig } from './firebaseConfig';

import Coin from './components/Card';
import FilterMenu from './components/FilterMenu';

class App extends Component {
  state = {};

  componentWillMount() {
    //If FireBase was already initialized, dont run it again
    if (firebase.apps.length === 0) {
      firebase.initializeApp({ ...firebaseConfig });
    }

    // Init FireBase database
    const ref = firebase
      .app()
      .database()
      .ref();

    let coins = {};

    // Once we have FireBase data, sort and set to state.
    ref.on('value', snapshot => {
      coins = snapshot.val().coins;
      coins = _.orderBy(coins, ['updated'], ['desc']);

      this.setState({
        ...this.state,
        ...coins
      });
    });
  }

  // Component function that will build out the card elements
  renderCoins = (data, coin) => {
    if (data.updated) {
      return <Coin key={data.coin} data={data} coin={data.coin} />;
    } else {
      return null;
    }
  };

  customSortCoins = (parameter, orderBy) => {
    const coins = _.orderBy(
      this.state,
      ['date', 'time', parameter],
      ['asc', 'asc', orderBy]
    );

    this.setState({
      ...coins
    });
  };

  render() {
    const coins = this.state;
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

export default App;
