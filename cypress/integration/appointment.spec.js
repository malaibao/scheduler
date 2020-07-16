describe('Appointment', () => {
  beforeEach(() => {
    cy.request('GET', '/api/debug/reset');
    cy.visit('/');
    cy.contains('Monday');
  });

  it('should book an interview', () => {
    cy.get('[alt=Add]').first().click();

    cy.get('[data-testid=student-name-input]').type('Einstein Jones');
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains('Save').click();

    cy.contains('.appointment__card--show', 'Einstein Jones');
    cy.contains('.appointment__card--show', 'Sylvia Palmer');
  });

  it('should edit an interview', () => {
    cy.get('.appointment__card--show').first();

    cy.get("[alt='Edit']").click({ force: true });

    cy.get('[data-testid=student-name-input]').clear().type('John Doe');
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains('Save').click();

    cy.contains('.appointment__card--show', 'John Doe');
    cy.contains('.appointment__card--show', 'Tori Malcolm');
  });

  it('should cancel an interview', () => {
    cy.get("[alt='Delete']").click({ force: true });
    cy.contains('Confirm').click();

    // Showing Deleting status spinner
    cy.contains('Deleting');
    cy.contains('Deleting').should('not.exist');

    cy.contains('.appointment__card--show', 'Archie Cohen').should('not.exist');
  });
});
