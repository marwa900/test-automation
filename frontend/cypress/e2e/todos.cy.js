describe('Todo App', () => {
  beforeEach(() => {
    // Visit your React app URL
    // eslint-disable-next-line no-undef
    cy.visit('http://localhost:3000'); 
  });

  it('should create a new todo item', () => {
    cy.get('input[placeholder="New todo"]')
      .type('Buy milk');

    cy.contains('Add').click();

    cy.contains('Buy milk').should('exist');
  });

  it('should edit an existing todo item', () => {
    // Assume there is at least one todo item
    cy.contains('Buy milk')
      .parent() // go to li element
      .contains('Edit')
      .click();

    cy.window().then((win) => {
      // Stub prompt to simulate edit text input
      cy.stub(win, 'prompt').returns('Buy almond milk');
      cy.contains('Edit').click(); // Trigger prompt again for test consistency
    });

    cy.contains('Buy almond milk').should('exist');
  });

  it('should delete a todo item', () => {
    cy.contains('Buy almond milk')
      .parent()
      .contains('Delete')
      .click();

    cy.contains('Buy almond milk').should('not.exist');
  });
});
