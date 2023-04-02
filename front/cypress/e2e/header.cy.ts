describe('Header', () => {
  it('should open login dialog on click', () => {
    cy.visit('/');
    cy.get('[header-login]').click();
    cy.get('[login-dialog]').should('exist');
  });

  it('should open register dialog on click', () => {
    cy.visit('/');
    cy.get('[header-register]').click();
    cy.get('[register-dialog]').should('exist');
  });
});
