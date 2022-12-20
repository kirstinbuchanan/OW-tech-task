import { titles } from '../fixtures/titles';

export const setUp = () => {
  cy.intercept(
    {
      url: 'https://owfetechtask.blob.core.windows.net/titledata/testdata.json',
      method: 'GET',
    },
    titles
  ).as('getTitles');
};
