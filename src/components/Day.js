import React from 'react';

function Day(props) {
  const newReminder = {date: props.date, time: "12:00", city:"Mexico City", color:"#1273de", reminder:"New Reminder"};
  const sortedReminders = props.reminders.sort((a,b) => {
     return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time)
   }).sort();

  const reminders = sortedReminders.map((item, key) =>
    <span
      className="calendarDays__reminder"
      style={{backgroundColor: item.color}}
      key={key}
      onClick={(e) => props.editReminder(e,item)}
    >
      {item.reminder}
    </span>
  );

  return (
    <div className="calendarDays__day" onClick={(e) => props.editReminder(e,newReminder)}>
      <span className="calendarDays__day-number">{props.day}</span>
      {reminders}
    </div>
  );
}

export default Day;
