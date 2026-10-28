const STORAGE_KEY = 'appointments';
export const APPOINTMENTS_EVENT = 'appointments-change';

export const getAppointments = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
};

export const saveAppointment = (doctorName, appointment) => {
  const appointments = getAppointments();
  if (appointment) appointments[doctorName] = appointment;
  else delete appointments[doctorName];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  window.dispatchEvent(new Event(APPOINTMENTS_EVENT));
};

export const clearAppointments = () => localStorage.removeItem(STORAGE_KEY);
