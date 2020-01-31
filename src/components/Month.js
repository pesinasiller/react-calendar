import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import Day from './Day';
import ReminderEditor from './ReminderEditor'

function Month(props){
  const [reminderToEdit, setReminderEditor] = useState({});

  const editReminder = (e,reminderData) => {
    e && e.stopPropagation();
    setReminderEditor(reminderData);
  }

  const firstDayOfMonth = new Date(props.year + "-" + props.month + "-01").getDay()
  const daysOfTheWeek = moment.weekdays().map((item, key) =>
    <div className="daysOfTheWeek__day" key={key}>
      {item}
    </div>
  );
  return (
    <>
      <div>{`${moment.months()[props.month-1]} ${props.year}`}</div>
      <div className="daysOfTheWeek">
        {daysOfTheWeek}
      </div>
      <div className="calendarDays">
        {Array.from(Array( 35 ), (e, i) => {
          const difference = i - firstDayOfMonth;
          const firstDate = `01-${props.month}-${props.year}`;
          const today = moment(firstDate, "DD-MM-YYYY").add(difference, 'days');
          const day = today.date();
          const todaysDate = today.format("DD-MM-YYYY");
          const todaysReminders = props.reminders[todaysDate] || [];
          return <Day
                  key={i}
                  year={props.year}
                  month={props.month}
                  day={day}
                  date={todaysDate}
                  reminders={todaysReminders}
                  editReminder={editReminder}
                  />
        })}
      </div>
      <ReminderEditor editReminder={editReminder} reminderData={reminderToEdit} />
    </>
  );
}

export default connect(
  state => {
    return {reminders: state.reminders}
  },
  null
 )(Month);
