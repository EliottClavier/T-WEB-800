import {LoginConst} from "../../src/app/enums/login-const";
import {ApiResponseConst} from "../../src/app/enums/api-response-const";

describe('Login', () => {

  let emailInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let passwordInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let loginButton: Cypress.Chainable<JQuery<HTMLElement>>;

  const LOGIN_RESPONSE = new LoginConst().INFO_MESSAGES;
  const API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  beforeEach(() => {
    cy.visit('/');
    cy.get('[header-login]').click();
    emailInput = cy.get('input[login-email]');
    passwordInput = cy.get('input[login-password]');
    loginButton = cy.get('app-simple-button[login-button] [simple-button]');
  });

  it('should display login page', () => {
    cy.get('h1[login-title]').should('contain.text', 'Hello again !'.toUpperCase());
  });

  it('should display required error message if email is empty', () => {
    emailInput.click();
    emailInput.clear();
    passwordInput.click();
    cy.get('#email mat-error').should('contain.text', LOGIN_RESPONSE.EMPTY_EMAIL);
  });

  it('should display required error message if password is empty', () => {
    passwordInput.click();
    passwordInput.clear();
    emailInput.click();
    cy.get('#password mat-error').should('contain.text', LOGIN_RESPONSE.EMPTY_PASSWORD);
  });

  it('should display email error message if email format is invalid', () => {
    emailInput.type('test.com');
    passwordInput.click();
    cy.get('#email mat-error').should('contain.text', LOGIN_RESPONSE.INVALID_EMAIL);
  });

  it('should display success message if login is successful', () => {
    cy.intercept('POST', '/api/auth/login', {fixture: '../fixtures/login/201_login-user', statusCode: 201}).as('201_login');
    loginButton = cy.get('app-simple-button[login-button] [simple-button]');
    emailInput.type('test@gmail.com');
    passwordInput.type('Password123');
    loginButton.click();
    cy.wait('@201_login').its('response.statusCode').should('eq', 201);
  });

  it('should display error message if credentials are bad', () => {
    cy.intercept('POST', '/api/auth/login', {fixture: '../fixtures/login/401_login-user', statusCode: 401}).as('401_login');
    loginButton = cy.get('app-simple-button[login-button] [simple-button]');
    emailInput.type('test@gmail.com');
    passwordInput.type('Password123');
    loginButton.click();
    cy.wait('@401_login').its('response.statusCode').should('eq', 401);
    cy.get('[login-error-request]').should('contain.text', API_RESPONSE.BAD_CREDENTIALS);
  });
});
