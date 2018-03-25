import React from 'react';
import { Dropdown } from 'semantic-ui-react';

import { primary } from '../data/sortOptions';

const SortingDropDown = () => <Dropdown placeholder="Select Primary Sort" search selection options={primary} />;

export default SortingDropDown;
