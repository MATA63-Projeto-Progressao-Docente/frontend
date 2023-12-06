/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:3000');
  cy.get('#email').type('admin@ufba.br');
  cy.get('#password').type('123123123');
  cy.get('button').click();
  cy.url().should('include', '/activities');
});

describe('ActivitiesPage', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should display the Activities Page', () => {
    cy.contains('h1', 'Minhas atividades').should('exist');
  });

  it('should display a list of activities', () => {
    cy.get('[data-requeriment]').should('have.length', 10); // Altere conforme o número de atividades no array
  });

  it('should display navigation links in the NavBar', () => {
    cy.get('nav').contains('Atividades').should('exist');
  });

  it('should add a new activity', () => {
    cy.get('button').contains('Adicionar atividade').click();

    cy.get('#modal');
      cy.get('#field').select('Campo');
      cy.get('#activity').select('2');
      cy.get('#title').type('Nova Atividade');
      cy.get('#hours').type('10');
      cy.get('#description').type('Descrição da nova atividade');

      cy.get('button').contains('Salvar').click();
    // Verifique se a nova atividade foi adicionada à lista
    cy.get('[data-requeriment]').should('have.length', 11); // Ajuste conforme o número esperado
  });

  it('should close modal', () => {
    cy.get('button').contains('Adicionar atividade').click();

    cy.get('#modal');
    cy.get('#btn-close').click();
    cy.get('#modal').should('not.be.visible');
  });
});
