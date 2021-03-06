import React from 'react';
import {shallow, mount} from 'enzyme';
import { Provider } from 'react-redux';
import store from '../store';

import {ReviewForm} from './review-form';

describe('<ReviewForm />', () => {
  it('Renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <ReviewForm />
      </Provider>
    );
  });

});