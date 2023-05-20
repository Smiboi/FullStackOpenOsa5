describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Meikäläinen',
      username: 'masa',
      password: 'meikä'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('masa')
      cy.get('#password').type('meikä')
      cy.get('#login-button').click()
      cy.contains('Matti Meikäläinen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('masa')
      cy.get('#password').type('meikäläinen')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('masa')
      cy.get('#password').type('meikä')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Hieno blogi')
      cy.get('#author').type('Jarmo Manner')
      cy.get('#url').type('www.jotain.fi')
      cy.get('#create-button').click()
      cy.contains('Hieno blogi by Jarmo Manner')
    })
  })
})
