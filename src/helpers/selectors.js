/* example of result
[
  { id: 1, time: '12pm', interview: null },
  { id: 2, time: '1pm', interview: null },
  {
    id: 3,
    time: '2pm',
    interview: { student: 'Archie Cohen', interviewer: 2 },
  },
]
*/
export const getAppointmentsForDay = (state, day) => {
  // check if days data is empty,
  if (state.days.length < 1) {
    return [];
  }

  // Find day in state
  const foundDay = state.days.find((stateDay) => stateDay.name === day);

  // check if day not found
  if (!foundDay) {
    return [];
  }

  const result = foundDay.appointments.map((id) => state.appointments[id]);
  return result;
};

/*
{  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}
*/
export const getInterview = (state, interview) => {
  return interview
    ? {
        ...interview,
        interviewer: state.interviewers[interview.interviewer],
      }
    : null;
};
