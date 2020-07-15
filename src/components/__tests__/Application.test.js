import React from 'react';
import axios from 'axios';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getByAltText,
  getAllByTestId,
  getByPlaceholderText,
  prettyDOM,
  queryByText,
  queryByAltText,
  queryAllByAltText,
  queryAllByTestId,
  queryByDisplayValue,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Application', () => {
  it('changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  //  ByLabelText, ByPlaceholderText, ByText, ByDisplayValue, ByAltText, ByTitle and ByRole
  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
    // console.log(prettyDOM(day));
    // debug();
  });

  it('load data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(
      container,
      'appointment'
    ).find((appointment) => queryByText(appointment, 'Archie Cohen'));

    fireEvent.click(queryByAltText(appointment, 'Delete'));

    expect(
      getByText(
        appointment,
        'Are you sure you would like to delete the appointment?'
      )
    ).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, 'Confirm'));

    expect(queryByText(appointment, 'Deleting')).toBeInTheDocument();

    await waitForElement(() => queryAllByAltText(container, 'Add'));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it('load, data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => queryByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(
      container,
      'appointment'
    ).find((appointment) => queryByText(appointment, 'Archie Cohen'));

    fireEvent.click(queryByAltText(appointment, 'Edit'));

    // Edit interviewee name
    fireEvent.change(queryByDisplayValue(appointment, 'Archie Cohen'), {
      target: { value: 'Lydia Miller-Jones' },
    });
    // edit interviewer
    fireEvent.click(queryByAltText(appointment, 'Tori Malcolm'));

    fireEvent.click(queryByText(appointment, 'Save'));

    expect(queryByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, 'Lydia Miller-Jones'));

    const day = queryAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    expect(queryByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it('shows the save error when failing to save an appointment', () => {
    axios.put.mockRejectedValueOnce();
  });

  it('shows the delete error when failing to delete an existing appointment', () => {
    axios.delete.mockRejectedValueOnce();
  });
});
