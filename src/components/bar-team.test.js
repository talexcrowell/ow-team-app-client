import React from 'react';
import {shallow, mount} from 'enzyme';
import { Provider } from 'react-redux';
import store from '../store';

import BarTeam from './bar-team';

describe('<BarTeam/>', () => {
 
  it('Renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <BarTeam />
      </Provider>
    );
  });

});