/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulario', function () {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies eget nulla non sagittis. Aliquam suscipit iaculis nulla, quis ultricies eros pellentesque et.'

        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('danillo@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies eget nulla non sagittis. Aliquam suscipit iaculis nulla, quis ultricies eros pellentesque et.'

        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('danillo')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('não preenche telefone se o valor for não numérico', function () {
        cy.get('#phone').type('danillo')
        cy.get('#phone').should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies eget nulla non sagittis. Aliquam suscipit iaculis nulla, quis ultricies eros pellentesque et.'

        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('danillo@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche os campos obrigatórios e envia o formulario', function () {

        cy.get('#firstName').type('Danillo').should('have.value','Danillo')
        cy.get('#lastName').type('Santos').should('have.value','Santos')
        cy.get('#email').type('danillo@email.com').should('have.value','danillo@email.com')
        cy.get('#phone').type('12345678').should('have.value','12345678')
        
        cy.get('#firstName').clear().should('have.value','')
        cy.get('#lastName').clear().should('have.value','')
        cy.get('#email').clear().should('have.value','')
        cy.get('#phone').clear().should('have.value','')
    })

    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })
  })