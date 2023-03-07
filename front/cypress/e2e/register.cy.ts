
describe('Register', () => {

  let nameInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let emailInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let passwordInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let confirmPasswordInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let registerButton: Cypress.Chainable<JQuery<HTMLElement>>;

  beforeEach(() => {
    cy.visit('/register-user');
    nameInput = cy.get('input[name="name"]');
    emailInput = cy.get('input[name="email"]');
    passwordInput = cy.get('input[name="password"]');
    confirmPasswordInput = cy.get('input[name="confirmPassword"]');
    registerButton = cy.get('.registerButton');
  });

  it('should display register page', () => {
    cy.get('h1').invoke('text').should('equal', 'Register User');
  });

  it('should display required error message if name is empty', () => {
    nameInput.click();
    nameInput.clear();
    emailInput.click();
    cy.get('#name mat-error').invoke('text').should('equal', 'Please enter your name');
  });

  it('should display required error message if email is empty', () => {
    emailInput.click();
    emailInput.clear();
    passwordInput.click();
    cy.get('#email mat-error').invoke('text').should('equal', 'Please enter your email');
  });

  it('should display required error message if password is empty', () => {
    passwordInput.click();
    passwordInput.clear();
    confirmPasswordInput.click();
    cy.get('#password mat-error').invoke('text').should('equal', 'Please enter your new password');
  });

  it('should display email error message if email format is invalid', () => {
    emailInput.type('test.com');
    passwordInput.click();
    cy.get('#email mat-error').invoke('text').should('equal', 'Please enter a valid email');
  });

  it('should display password error message if password is too short', () => {
    passwordInput.type('pass');
    confirmPasswordInput.click();
    cy.get('#password mat-error').invoke('text').should('equal', 'Password must be at least 6 characters');
  });

  it('should display confirm password error message if confirm password is not equal to password', () => {
    passwordInput.type('Password123');
    confirmPasswordInput.type('Password');
    confirmPasswordInput.click();
    cy.get('#confirmPassword mat-error').invoke('text').should('equal', 'Passwords do not match');
  });

  it('should display success message if register is successful', () => {
    nameInput.type('Test');
    emailInput.type('test@gmail.com');
    passwordInput.type('Password123');
    confirmPasswordInput.type('Password123');
    registerButton.click();
    cy.get('.successRegister mat-card-content').invoke('text').should('equal', 'You are register with success !');
  });
});
