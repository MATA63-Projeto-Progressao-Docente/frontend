/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  
  cy.visit('http://localhost:3000'); 
  cy.get('#email').type('valid-email@example.com');
    cy.get('#password').type('password123');
    cy.get('button').click();
    cy.url().should('include', '/init');
});

describe('InitPage', () => {
  beforeEach(() => {
    
    cy.login();
  });

  it('should display the InitPage', () => {
    cy.contains('h1', 'Meus Requerimentos').should('exist');
  });

  it('should display a list of requerimentos', () => {
    cy.get('[data-requerimento]')
    .should('have.length', 2);
  });
  
  

  it('should display navigation links in the NavBar', () => {
    cy.get('nav').contains('Início').should('exist');
    cy.get('nav').contains('Requerimentos').should('exist');
    cy.get('nav').contains('Outra Página').should('exist');
  });
});
