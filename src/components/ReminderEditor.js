import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { connect } from 'react-redux';
import { saveReminder, deleteReminder } from '../actions/actions';
import Modal from 'simple-react-modal'
import DatePicker from 'react-datepicker';
import { GithubPicker } from 'react-color';
import Weather from './Weather';
import "react-datepicker/dist/react-datepicker.css";

const ReminderEditor = (props) => {
  const [reminderData, setReminderData] = useState({...props.reminderData});
  useEffect(() => {
      setReminderData(props.reminderData);
  }, [props.reminderData])

  const setDate = (date) => {
    const reminderDate = moment(date);
    setReminderData({
      ...reminderData,
      date: reminderDate.format("DD-MM-YYYY"),
      time: reminderDate.format("HH:mm")
    })
  }

  const onColorChange = (color) => {
    setReminderData({
      ...reminderData,
      color: color.hex
    })
  };

  const handleInputChange = (e) => setReminderData({
    ...reminderData,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const saveReminder = () => {
    props.saveReminder(reminderData, props.reminderData);
    props.editReminder(null,{})
  }
  const deleteReminder = () => {
    props.deleteReminder(reminderData);
    props.editReminder(null,{})
  }
  const selectedDate = Object.keys(reminderData).length!==0 ?
    new Date(moment(`${reminderData.date} ${reminderData.time}`, "DD-MM-YYYY HH:mm"))
    : new Date();

  return (
    <Modal
      //if reminderData is null close editor modal
      show={Object.keys(props.reminderData).length!==0}
    >
      <div className="reminder-editor-modal">
        <span
          className="reminder-editor-modal__close-button"
          onClick={(e)=>props.editReminder(e,{})}>X</span>
        <form>
          <div className="reminder-editor-modal__section">
            <label>Reminder:</label>
            <textarea
              type="text"
              name="reminder"
              value={reminderData.reminder||""}
              maxLength={30}
              onChange={handleInputChange} />
          </div>
          <div className="reminder-editor-modal__section">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={reminderData.city||""}
              onChange={handleInputChange} />
          </div>
          <div className="reminder-editor-modal__section">
            <Weather city={reminderData.city} date={selectedDate} />
          </div>
          <div className="reminder-editor-modal__section">
            <label>Date and time:</label>
            <DatePicker
              selected={selectedDate}
              onChange={date => setDate(date)}
              showTimeSelect
              timeIntervals={15}
              inline
            />
          </div>
          <div className="reminder-editor-modal__section">
            <label>Color:</label>
            <GithubPicker
              color={ reminderData.color }
              onChangeComplete={ onColorChange }
            />
          </div>
          <br />
          <button type="button" onClick={saveReminder}>save</button>
          <button type="button" onClick={deleteReminder}>delete</button>
        </form>
      </div>
    </Modal>
  )
}

export default connect(
  null,
  {
    saveReminder: saveReminder,
    deleteReminder: deleteReminder,
  }
 )(ReminderEditor);
