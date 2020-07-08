export const getAppointmentsForDay = (state, day) => {
  const result = [];
  const stateDays = [...state.days];
  const stateAppointments = { ...state.appointments };

  // check if days data is empty
  if (stateDays.length < 1) {
    return [];
  }

  // Find day in state
  const foundDay = stateDays.find((stateDay) => stateDay.name === day);

  // check if day not found
  if (!foundDay) {
    return [];
  }

  for (let [key, value] of Object.entries(stateAppointments)) {
    if (foundDay.appointments.includes(Number(key))) {
      result.push(value);
    }
  }

  return result;
};
