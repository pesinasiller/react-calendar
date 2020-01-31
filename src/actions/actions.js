export const SAVE_REMINDER = 'SAVE_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';

export function saveReminder(data, previousVersion) {
  return { type: SAVE_REMINDER, data: data, previousVersion: previousVersion };
}

export function deleteReminder(data) {
  return { type: DELETE_REMINDER, data: data };
}
