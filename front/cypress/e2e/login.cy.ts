import {LoginConst} from "../../src/app/enums/login-const";

describe('Login', () => {

  let emailInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let passwordInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let loginButton: Cypress.Chainable<JQuery<HTMLElement>>;

  const LOGIN_RESPONSE = new LoginConst().INFO_MESSAGES;

  beforeEach(() => {
    cy.visit('/login');
    emailInput = cy.get('input[name="email"]');
    passwordInput = cy.get('input[name="password"]');
    loginButton = cy.get('button[name="loginButton"]');
  });

  it('should display login page', () => {
    cy.get('h1').invoke('text').should('equal', 'Login');
  });

  it('should display required error message if email is empty', () => {
    emailInput.click();
    emailInput.clear();
    passwordInput.click();
    cy.get('#email mat-error').invoke('text').should('equal', LOGIN_RESPONSE.EMPTY_EMAIL);
  });

  it('should display required error message if password is empty', () => {
    passwordInput.click();
    passwordInput.clear();
    emailInput.click();
    cy.get('#password mat-error').invoke('text').should('equal', LOGIN_RESPONSE.EMPTY_PASSWORD);
  });

  it('should display email error message if email format is invalid', () => {
    emailInput.type('test.com');
    passwordInput.click();
    cy.get('#email mat-error').invoke('text').should('equal', LOGIN_RESPONSE.INVALID_EMAIL);
  });

  it('should display success message if login is successful', () => {
    emailInput.type('test@gmail.com');
    passwordInput.type('Password123');
    loginButton.click();

    cy.get('.successLogin mat-card-content').invoke('text').should('equal', LOGIN_RESPONSE.SUCCESS_LOGIN);
  });
});
