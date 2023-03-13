import {RegisterConst} from "../../src/app/enums/register-const";

describe('Register', () => {

  let firstNameInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let lastNameInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let emailInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let passwordInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let confirmPasswordInput: Cypress.Chainable<JQuery<HTMLElement>>;
  let registerButton: Cypress.Chainable<JQuery<HTMLElement>>;

  const INFO_MESSAGES = new RegisterConst().INFO_MESSAGES;

  beforeEach(() => {
    cy.visit('/register-user');
    firstNameInput = cy.get('input[name="firstName"]');
    lastNameInput = cy.get('input[name="lastName"]');
    emailInput = cy.get('input[name="email"]');
    passwordInput = cy.get('input[name="password"]');
    confirmPasswordInput = cy.get('input[name="confirmPassword"]');
    registerButton = cy.get('.registerButton');
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
    cy.get('#email mat-error').invoke('text').should('equal', INFO_MESSAGES.EMPTY_EMAIL);
  });

  it('should display required error message if password is empty', () => {
    passwordInput.click();
    passwordInput.clear();
    confirmPasswordInput.click();
    cy.get('#password mat-error').invoke('text').should('equal', INFO_MESSAGES.EMPTY_PASSWORD);
  });

  it('should display email error message if email format is invalid', () => {
    emailInput.type('test.com');
    passwordInput.click();
    cy.get('#email mat-error').invoke('text').should('equal', INFO_MESSAGES.INVALID_EMAIL);
  });

  it('should display password error message if password is too short', () => {
    passwordInput.type('pass');
    confirmPasswordInput.click();
    cy.get('#password mat-error').invoke('text').should('equal', INFO_MESSAGES.SHORT_PASSWORD);
  });

  it('should display confirm password error message if confirm password is not equal to password', () => {
    passwordInput.type('Password123');
    confirmPasswordInput.type('Password');
    confirmPasswordInput.click();
    cy.get('#confirmPassword mat-error').invoke('text').should('equal', INFO_MESSAGES.DIFFERENTS_PASSWORD);
  });

  it('should display success message if register is successful', () => {
    firstNameInput.type('Albert');
    lastNameInput.type('Test');
    emailInput.type('test@gmail.com');
    passwordInput.type('Password123');
    confirmPasswordInput.type('Password123');
    registerButton.click();
    cy.get('.successRegister mat-card-content').invoke('text').should('equal', INFO_MESSAGES.SUCCESS_REGISTER);
  });
});
