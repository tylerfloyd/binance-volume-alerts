import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import SortingDropDown from '../common/Dropdown';
import ButtonGroup from '../common/ButtonGroup';

export default class FilterMenu extends Component {
  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <SortingDropDown />
          </Grid.Column>
          <Grid.Column>
            <ButtonGroup
              size="large"
              leftText="Ascending"
              rightText="Descending"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
