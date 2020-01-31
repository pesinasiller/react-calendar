import { SAVE_REMINDER, DELETE_REMINDER, } from '../actions/actions';

const initialState = {
  reminders: {
    "02-02-2020":[
                  {date:"02-02-2020", time: "03:00", city:"Tlaquepaque", color:"purple", reminder:"study"},
                  {date:"02-02-2020", time: "04:15", city:"Mexico", color:"#1273de", reminder:"home office"},
                  {date:"02-02-2020", time: "02:15", city:"Guadalajara", color:"coral", reminder:"laundry"}
                ],
    "04-02-2020":[
                  {date:"04-02-2020", time: "05:30", city:"Tlaquepaque", color:"red", reminder:"day off"},
                  {date:"04-02-2020", time: "04:00", city:"Mexico", color:"#1273de", reminder:"exam"}
                ],
    "19-02-2020":[
                  {date:"19-02-2020", time: "05:30", city:"London", color:"orange", reminder:"study"},
                ]
  }
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_REMINDER:
      {
        const newReminders = {...state.reminders};

        //delete previous version (different date) if it exists
        if (Object.keys(action.previousVersion).length!==0 && newReminders[action.previousVersion.date]){
          newReminders[action.previousVersion.date] = newReminders[action.previousVersion.date].filter(
            (reminder) => { return reminder.time !== action.previousVersion.time}
          );
        }

        //delete reminder if already exists:
        if(newReminders[action.data.date]){
          newReminders[action.data.date] = newReminders[action.data.date].filter(
            (reminder) => { return reminder.time !== action.data.time}
          );
        }else{
          //if there is no array for that date create an empty one:
          newReminders[action.data.date] = []
        }

        newReminders[action.data.date].push(action.data)

        return {
            ...state,
            reminders: newReminders
        };
      }
      case DELETE_REMINDER:
        {
          const newReminders = {...state.reminders};
          if(newReminders[action.data.date]){
            newReminders[action.data.date] = newReminders[action.data.date].filter(
              (reminder) => { return reminder.time !== action.data.time}
            );
          }
          return {
              ...state,
              reminders: newReminders
          };
        }
      default:
        return state;
  };
}

export default rootReducer;
