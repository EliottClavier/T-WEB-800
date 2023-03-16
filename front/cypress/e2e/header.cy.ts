describe('Header', () => {
  it('should navigate to "/login" when login button is clicked', () => {
    cy.visit('/');
    cy.get('.login').click();
    cy.url().should('include', '/login');
  });

  it('should navigate to "/register-user" when register button is clicked', () => {
    cy.visit('/');
    cy.get('.register').click();
    cy.url().should('include', '/register-user');
  });
});
