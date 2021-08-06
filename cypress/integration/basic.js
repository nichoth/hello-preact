var URL = 'http://localhost:9966'

describe('My First Test', () => {
    it('Does not do much!', () => {
        expect(true).to.equal(true)
        cy.visit(URL)
        cy.get('body').should('exist')
    })
})

