/// <reference types="cypress" />

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
  });

  it('should redirect to login page when not authenticated', () => {
    cy.visit('/init');
    cy.url().should('include', '/login');
  });
  

  it('should display login form', () => {
    cy.get('form').should('exist');
  });

  it('should display error on invalid email', () => {
    cy.get('#email').type('invalid-email');
    cy.get('button').click();
    cy.get('.border-danger').should('exist');
  });

  it('should successfully log in with valid credentials', () => {
    cy.get('#email').type('valid-email@example.com');
    cy.get('#password').type('password123');
    cy.get('button').click();
    cy.url().should('include', '/init'); // Verifique se a navegação ocorreu corretamente
  });

  it('should display error on valid email with invalid password', () => {
    cy.get('#email').type('valid-email@example.com');
    cy.get('button').click();
    cy.get('.border-danger').should('exist');
  });

  it('should display error on invalid credentials', () => {
    cy.get('#email').type('valid-email@example.com');
    cy.get('#password').type('invalid-password');
    cy.get('button').click();
    cy.get('alert').should('exist'); // Certifique-se de ajustar se você usa algum método específico para exibir erros
  });
});
