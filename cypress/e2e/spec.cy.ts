beforeEach(() => {
  cy.task('resetDbTask')
  cy.visit('/')
});

it('add todo', () => {

  cy.get('[data-test=new-todo]')
    .type('buy milk{enter}')

  cy.contains('[data-test=todo-item]', 'buy milk')
    .should('be.visible')
  
});

it('edit todo', () => {

  cy.get('[data-test=new-todo]')
    .type('buy milk{enter}')

  cy.get('[data-test=todo-item]')
    .click()

  cy.get('[data-test=todo-edit-field]')
    .clear()
    .type('clean up room{enter}')

  cy.contains('[data-test=todo-item]', 'clean up room')
    .should('be.visible')
  
});

it('complete todo', () => {

  cy.get('[data-test=new-todo]')
    .type('buy milk{enter}')

  cy.get('[data-test=todo-complete]')
    .check()
    .should('be.checked')
  
});


it('remove todo', () => {

  cy.get('[data-test=new-todo]')
    .type('buy milk{enter}')

  cy.get('[data-test=todo-delete]')
    .click({force: true})

  cy.get('[data-test=todo-item]')
    .should('not.exist')
  
});