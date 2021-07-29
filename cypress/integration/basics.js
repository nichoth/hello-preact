var URL = 'http://localhost:9966'

describe('My First Test', () => {
    it('Does not do much!', () => {
        expect(true).to.equal(true)
    })
})

describe('The slideshow', () => {
    it('Has a picture', () => {
        cy.visit(URL)
        cy.get('.slideshow img').should('be.visible')
    })

    it('Starts a index 0', () => {
        cy.get('.img-index').contains('0')
    })

    it('Starts at the right default speed', () => {
        cy.get('.controls.speed').contains('3000')
    })
})

describe('Single image view', () => {
    it('shows a single image', () => {
        cy.visit(URL + '/0')
        cy.get('.specific-image img').should('be.visible')
    })
})

// test ideas
// * test clicking the next and prev links from the single-image view
// * test adjusting the speed of the slideshow
// * test that the image changes at the right speed by setting a timeout
// in the test file
