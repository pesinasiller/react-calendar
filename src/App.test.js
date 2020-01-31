import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import store from './store/store';
import Month from './components/Month';

test('displays correct month and year', () => {
  let { getByText } = render(
    <Provider store={store}>
      <Month year={2020} month={1} />
    </Provider>);
  const monthName = getByText("January 2020");
  expect(monthName).toBeInTheDocument();
});
