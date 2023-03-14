import {LoginConst} from "../../src/app/enums/login-const";
import {ApiResponseConst} from "../../src/app/enums/api-response-const";

describe('Login', () => {

  let emailInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let passwordInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let loginButton: Cypress.Chainable<JQuery<HTMLElement>>;

  const LOGIN_RESPONSE = new LoginConst().INFO_MESSAGES;
  const API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

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
    cy.intercept('POST', '/api/auth/login', {fixture: '../fixtures/201_login-user', statusCode: 201}).as('201_login');
    emailInput.type('test@gmail.com');
    passwordInput.type('Password123');
    loginButton.click();
    cy.wait('@201_login').its('response.statusCode').should('eq', 201);
    cy.get('.successLogin mat-card-content').invoke('text').should('equal', LOGIN_RESPONSE.SUCCESS_LOGIN);
  });

  it('should display error message if credentials are bad', () => {
    cy.intercept('POST', '/api/auth/login', {fixture: '../fixtures/401_login-user', statusCode: 401}).as('401_login');
    emailInput.type('test@gmail.com');
    passwordInput.type('Password123');
    loginButton.click();
    cy.wait('@401_login').its('response.statusCode').should('eq', 401);
    cy.get('mat-error[name="errorRequest"]').invoke('text').should('equal', API_RESPONSE.BAD_CREDENTIALS);
  });
});
