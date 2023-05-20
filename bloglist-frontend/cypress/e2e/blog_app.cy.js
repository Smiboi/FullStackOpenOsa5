describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // const user = {
    //   name: 'Matti Meikäläinen',
    //   username: 'masa',
    //   password: 'meikä'
    // }
    // cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login to application')
    cy.contains('username')
    cy.contains('password')
  })
})
