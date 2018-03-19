import React from 'react';
import { Dropdown } from 'semantic-ui-react';

import { primary } from '../common/sortOptions';

const SortingDropDown = () => (
  <Dropdown
    placeholder="Select Primary Sort"
    search
    selection
    options={primary}
  />
);

export default SortingDropDown;
