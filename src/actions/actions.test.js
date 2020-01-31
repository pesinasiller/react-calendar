import configureStore from 'redux-mock-store';
import {saveReminder} from './actions';
const mockStore = configureStore();
const store = mockStore();

const reminder = {date:"02-01-2020", time: "02:15", city:"gdl 3", color:"#1273de", reminder:"1"};
/*
describe('actions',()=>{
    it('Dispatches the correct action', () => {
        const save = saveReminder(reminder,reminder);
        expect(save).toEqual({type: "SAVE_REMINDER", data: reminder, previousVersion: reminder})
    });
});
*/
describe('saveReminder', () => {
  test('Dispatches the correct action', () => {
    const expectedActions = [
      {
        type: 'SAVE_REMINDER',
        data: reminder,
        previousVersion: reminder,
      },
    ];

    store.dispatch(saveReminder(reminder,reminder));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
