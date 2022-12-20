import { setUp } from '../support/common_setup';

describe('app', () => {
  beforeEach(() => {
    setUp();
    cy.visit('/');
  });

  it('should display the main page', () => {
    cy.getByTestId('title-table').should('be.visible');

    cy.getByTestId('title-table').within(() => {
      cy.getByTestId('title-table-row').should('have.length', 5);

      cy.getByTestId('title-table-row')
        .first()
        .within(() => {
          cy.getByTestId('title-table-cell').first().should('have.text', '243751');
        });
    });
  });

  it('should open the title details page when a row is clicked', () => {
    cy.contains('243751').click();

    cy.url().should('include', '/243751');
    cy.getByTestId('details-header').should('have.text', '243751 Freehold');
    cy.get("[alt='Marker']").should('be.visible').click();
    cy.contains('31-35 Kirby Street, London, EC1N 8TE');
    cy.get("[aria-role='Back button']").click();
    cy.url().should('not.include', '/243751');
  });

  it('should change the url when pagination buttons are clicked', () => {
    cy.get("[aria-label='Next page']").click();

    cy.url().should('include', '?page=2');

    cy.get("[aria-label='Previous page']").click();

    cy.url().should('include', '?page=1');
  });

  it("should sort the table by title when the 'Title' header is clicked", () => {
    // API order

    // NOTE: could extract these into a helper function
    cy.getByTestId('title-table-row')
      .first()
      .within(() => {
        cy.getByTestId('title-table-cell').first().should('have.text', '243751');
      });

    cy.getByTestId('sort-icon').click();

    // ascending order
    cy.getByTestId('title-table-row')
      .first()
      .within(() => {
        cy.getByTestId('title-table-cell').first().should('have.text', '243751');
      });

    cy.getByTestId('sort-icon').click();

    // descending order
    cy.getByTestId('title-table-row')
      .first()
      .within(() => {
        cy.getByTestId('title-table-cell').first().should('have.text', 'NGL937491');
      });
  });
});
