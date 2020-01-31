import reducer from './reducers'
import { SAVE_REMINDER } from '../actions/actions';

const reminderData = {date:"04-01-2020", time: "04:00", city:"gdl", color:"#1273de", reminder:"first"};
const secondReminderData = {date:"05-01-2020", time: "05:00", city:"gdl", color:"#1273de", reminder:"second"};

describe('reducer', () => {
  it('should save new reminders', () => {

    expect(
      reducer([], {
        type: SAVE_REMINDER,
        data: reminderData,
        previousVersion: reminderData
      })
    ).toEqual({
        reminders: {"04-01-2020":[reminderData]}
    });

    expect(
      reducer(
        {
        reminders: {"04-01-2020":[reminderData]}
        },
        {
          type: SAVE_REMINDER,
          data: secondReminderData,
          previousVersion: secondReminderData
        }
      )
    ).toEqual({
        reminders: {
          "04-01-2020":[reminderData],
          "05-01-2020":[secondReminderData]
        }
    });
  });

  it('should not duplicate reminders with same date/time', () => {
    expect(
      reducer(
        {
        reminders: {"04-01-2020":[reminderData]}
        },
        {
          type: SAVE_REMINDER,
          data: reminderData,
          previousVersion: reminderData
        }
      )
    ).toEqual({
        reminders: {"04-01-2020":[reminderData]}
    });
  });

  it('should update reminders (remove previous)', () => {
    expect(
      reducer(
        {
        reminders: {"04-01-2020":[reminderData]}
        },
        {
          type: SAVE_REMINDER,
          data: secondReminderData,
          previousVersion: reminderData
        }
      )
    ).toEqual({
        reminders: {"04-01-2020":[], "05-01-2020":[secondReminderData]}
    });
  });

});
