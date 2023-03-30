import {RegisterConst} from "../../src/app/enums/register-const";
import {ApiResponseConst} from "../../src/app/enums/api-response-const";

describe('Register', () => {

  let firstNameInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let lastNameInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let emailInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let passwordInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let confirmPasswordInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let registerButton: Cypress.Chainable<JQuery<HTMLElement>>;

  const REGISTER_RESPONSE = new RegisterConst().INFO_MESSAGES;
  const API_RESPONSE = new ApiResponseConst().INFO_MESSAGES;

  beforeEach(() => {
    cy.visit('/');
    cy.get('[header-register]').click()
    firstNameInput = cy.get('input[register-first-name]');
    lastNameInput = cy.get('input[register-last-name]');
    emailInput = cy.get('input[register-email]');
    passwordInput = cy.get('input[register-password]');
    confirmPasswordInput = cy.get('input[register-confirm-password]');
    registerButton = cy.get('app-simple-button[register-button] [simple-button]');
  });

  it('should display register page', () => {
    cy.get('h1[register-title]').should('contain.text', 'Welcome among us !'.toUpperCase());
  });

  it('should display required error message if first name is empty', () => {
    firstNameInput.click();
    firstNameInput.clear();
    emailInput.click();
    cy.get('#firstName mat-error').should('contain.text', REGISTER_RESPONSE.EMPTY_NAME);
  });

  it('should display required error message if last name is empty', () => {
    lastNameInput.click({ force: true });
    lastNameInput.clear({ force: true });
    emailInput.click();
    cy.get('#lastName mat-error').should('contain.text', REGISTER_RESPONSE.EMPTY_NAME);
  });

  it('should display required error message if email is empty', () => {
    emailInput.click();
    emailInput.clear();
    passwordInput.click();
    cy.get('#email mat-error').should('contain.text', REGISTER_RESPONSE.EMPTY_EMAIL);
  });

  it('should display required error message if password is empty', () => {
    passwordInput.click();
    passwordInput.clear();
    confirmPasswordInput.click({ force: true });
    cy.get('#password mat-error').should('contain.text', REGISTER_RESPONSE.EMPTY_PASSWORD);
  });

  it('should display email error message if email format is invalid', () => {
    emailInput.type('test.com', { force: true });
    passwordInput.click({ force: true });
    cy.get('#email mat-error').should('contain.text', REGISTER_RESPONSE.INVALID_EMAIL);
  });

  it('should display password error message if password is too short', () => {
    passwordInput.type('pass', { force: true });
    confirmPasswordInput.click({ force: true });
    cy.get('#password mat-error').should('contain.text', REGISTER_RESPONSE.SHORT_PASSWORD);
  });

  it('should display confirm password error message if confirm password is not equal to password', () => {
    passwordInput.type('Password123');
    confirmPasswordInput.type('Password', { force: true });
    confirmPasswordInput.click();
    cy.get('#confirmPassword mat-error').should('contain.text', REGISTER_RESPONSE.DIFFERENTS_PASSWORD);
  });

  it('should display success message if register is successful', () => {
    cy.intercept('POST', '/api/auth/register', {fixture: '../fixtures/register/201_register-user', statusCode: 201}).as('201_register');
    registerButton = cy.get('app-simple-button[register-button] [simple-button]');
    firstNameInput.type('Albert');
    lastNameInput.type('Test', { force: true });
    emailInput.type('test@gmail.com');
    passwordInput.type('Password123', { force: true });
    confirmPasswordInput.type('Password123', { force: true });
    registerButton.click({ force: true });

    cy.wait('@201_register').its('response.statusCode').should('eq', 201);
  });

  it('should display error message if bad request', () => {
    cy.intercept('POST', '/api/auth/register', {fixture: '../fixtures/register/400_register-user', statusCode: 400}).as('400_register');
    registerButton = cy.get('app-simple-button[register-button] [simple-button]');
    firstNameInput.type('Albert');
    lastNameInput.type('Test', { force: true });
    emailInput.type('test@gmail.com');
    passwordInput.type('Password123', { force: true });
    confirmPasswordInput.type('Password123', { force: true });
    registerButton.click({ force: true });

    cy.wait('@400_register').its('response.statusCode').should('eq', 400);

    cy.get('[register-error-request]').should('contain.text', API_RESPONSE.BAD_REQUEST);
  });
});
