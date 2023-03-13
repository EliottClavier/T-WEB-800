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
    cy.visit('/register-user');
    firstNameInput = cy.get('input[name="firstName"]');
    lastNameInput = cy.get('input[name="lastName"]');
    emailInput = cy.get('input[name="email"]');
    passwordInput = cy.get('input[name="password"]');
    confirmPasswordInput = cy.get('input[name="confirmPassword"]');
    registerButton = cy.get('.registerButton');
    cy.intercept('POST', '/api/auth/register', {fixture: '../fixtures/201_register-user', statusCode: 201}).as('201_register');
    cy.intercept('POST', '/api/auth/register', {statusCode: 400}).as('400_register');
    cy.intercept('POST', '/api/auth/register', {statusCode: 403}).as('403_register');
    cy.intercept('POST', '/api/auth/register', {statusCode: 404}).as('404_register');
  });

  it('should display register page', () => {
    cy.get('h1').invoke('text').should('equal', 'Register User');
  });

  it('should display required error message if first name is empty', () => {
    firstNameInput.click();
    firstNameInput.clear();
    emailInput.click();
    cy.get('#firstName mat-error').invoke('text').should('equal', INFO_MESSAGES.EMPTY_NAME);
  });

  it('should display required error message if last name is empty', () => {
    lastNameInput.click();
    lastNameInput.clear();
    emailInput.click();
    cy.get('#lastName mat-error').invoke('text').should('equal', INFO_MESSAGES.EMPTY_NAME);
  });

  it('should display required error message if email is empty', () => {
    emailInput.click();
    emailInput.clear();
    passwordInput.click();
    cy.get('#email mat-error').invoke('text').should('equal', REGISTER_RESPONSE.EMPTY_EMAIL);
  });

  it('should display required error message if password is empty', () => {
    passwordInput.click();
    passwordInput.clear();
    confirmPasswordInput.click();
    cy.get('#password mat-error').invoke('text').should('equal', REGISTER_RESPONSE.EMPTY_PASSWORD);
  });

  it('should display email error message if email format is invalid', () => {
    emailInput.type('test.com');
    passwordInput.click();
    cy.get('#email mat-error').invoke('text').should('equal', REGISTER_RESPONSE.INVALID_EMAIL);
  });

  it('should display password error message if password is too short', () => {
    passwordInput.type('pass');
    confirmPasswordInput.click();
    cy.get('#password mat-error').invoke('text').should('equal', REGISTER_RESPONSE.SHORT_PASSWORD);
  });

  it('should display confirm password error message if confirm password is not equal to password', () => {
    passwordInput.type('Password123');
    confirmPasswordInput.type('Password');
    confirmPasswordInput.click();
    cy.get('#confirmPassword mat-error').invoke('text').should('equal', REGISTER_RESPONSE.DIFFERENTS_PASSWORD);
  });

  it('should display success message if register is successful', () => {
    firstNameInput.type('Albert');
    lastNameInput.type('Test');
    emailInput.type('test@gmail.com');
    passwordInput.type('Password123');
    confirmPasswordInput.type('Password123');
    registerButton.click();

    cy.wait('@201_register');

    cy.get('.successRegister mat-card-content').invoke('text').should('equal', REGISTER_RESPONSE.SUCCESS_REGISTER);
  });

  it('should display error message if bad request', () => {
    nameInput.type('Test');
    emailInput.type('test@gmail.com');
    passwordInput.type('Password123');
    confirmPasswordInput.type('Password123');
    registerButton.click();

    cy.wait('@400_register');

    cy.get('.errorRequest').invoke('text').should('equal', API_RESPONSE.BAD_REQUEST);
  });
});
