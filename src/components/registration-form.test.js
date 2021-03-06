import React from 'react';
import {shallow, mount} from 'enzyme';
import { Provider } from 'react-redux';
import store from '../store';

import {RegistrationForm} from './registration-form';

describe('<RegistrationForm />', () => {
  it('Renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <RegistrationForm />
      </Provider>
    );
  });

});