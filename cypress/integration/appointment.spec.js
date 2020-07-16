const { describe } = require('mocha');

describe('Appointment', () => {
  it('should book an interview', () => {
    // Clicks on the "Add" button in the second appointment
    // Enters their name
    // Chooses an interviewer
    // Clicks the save button
    // Sees the booked appointment
    cy.get('[data-testid=appointment]')
      .second()
      //   .should('have.class', 'appointment__add-button')
      .get('.appointment__add-button')
      .click();

    cy.get('[data-testid=student-name-input]').type('Einstein');
    cy.get('li img').first().click();

    cy.get('button.button--confirm').click();

    // cy.get(':nth-child(2) > ').should('have.text', 'Einstein');
  });

  xit('should edit an interview', () => {});

  xit('should cancel an interview', () => {});
});
