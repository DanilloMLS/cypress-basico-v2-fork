/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq','Central de Atendimento ao Cliente TAT')
    })

    //Ex 0 e Ex8
    it('preenche os campos obrigatórios e envia o formulario', function () {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies eget nulla non sagittis. Aliquam suscipit iaculis nulla, quis ultricies eros pellentesque et.'

        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('danillo@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    //Ex 1 e Ex8
    it('texto longo sem delay', function () {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies eget nulla non sagittis. Aliquam suscipit iaculis nulla, quis ultricies eros pellentesque et.'

        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('danillo@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    //Ex 2 e Ex8
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies eget nulla non sagittis. Aliquam suscipit iaculis nulla, quis ultricies eros pellentesque et.'

        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('danillo')
        cy.get('#open-text-area').type(longText, {delay: 0})
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Ex 3
    it('não preenche telefone se o valor for não numérico', function () {
        cy.get('#phone').type('danillo').should('have.value','')
    })

    //Ex 4 e Ex8
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultricies eget nulla non sagittis. Aliquam suscipit iaculis nulla, quis ultricies eros pellentesque et.'

        cy.get('#firstName').type('Danillo')
        cy.get('#lastName').type('Santos')
        cy.get('#email').type('danillo@email.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('#phone-checkbox').check()
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Ex 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Danillo').should('have.value','Danillo').clear().should('have.value','')
        cy.get('#lastName').type('Santos').should('have.value','Santos').clear().should('have.value','')
        cy.get('#email').type('danillo@email.com').should('have.value','danillo@email.com').clear().should('have.value','')
        cy.get('#phone').type('12345678').should('have.value','12345678').clear().should('have.value','')
    })

    //Ex 6 e Ex8
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Ex 7
    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillAllMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
  })