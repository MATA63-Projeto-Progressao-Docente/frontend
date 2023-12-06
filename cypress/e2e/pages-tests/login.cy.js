/// <reference types="cypress" />

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
  });

  it('Integration Test: Must login with request', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/login',
        body: {
          email: 'admin@ufba.br',
          password: '123123123',
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        // Adicione mais verificações conforme necessário
      });
    });

  it('should redirect to login page when not authenticated', () => {
    cy.visit('/home');
    cy.url().should('include', '/');
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
    cy.get('#email').type('admin@ufba.br');
    cy.get('#password').type('123123123');
    cy.get('button').click();
    cy.url().should('include', '/home'); // Verifique se a navegação ocorreu corretamente
  });

  it('should display error on valid email with invalid password', () => {
    cy.get('#email').type('admin@ufba.br');
    cy.get('button').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Credenciais estão incorretas.`)
    });
  });

  it('should display error on invalid credentials', () => {
    cy.get('#email').type('valid-email@example.com');
    cy.get('#password').type('invalid-password');
    cy.get('button').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Credenciais estão incorretas.`)
    }) 
  });
});
