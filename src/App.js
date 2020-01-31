import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import Month from './components/Month';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Month year={2020} month={2} />
    </Provider>
  );
}
export default App;
