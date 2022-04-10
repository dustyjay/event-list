import { mount } from '@cypress/vue';
import testData from './test-data.json';
import EventApp from '../../App.vue';

describe('Event card', () => {
  beforeEach(() => {
    mount(EventApp);
    cy.wait(2000);
  });

  it('renders the right amount of events', () => {
    cy.get('.section-content.events')
      .children()
      .should($e => {
        expect($e).to.have.length(testData.length);
      });
  });

  it('renders the first 5 items as featured', () => {
    cy.get('.is-featured .card').should($c => {
      expect($c).to.have.length(5);
      expect($c).to.have.class('featured');
    });
  });

  it('searches and filters through the All Event list section', () => {
    cy.get('input').type('praise');
    cy.get('.section-content.events').should('not.exist');
    cy.get('.events-empty').should('exist');

    cy.get('input').focus().clear();
    cy.get('input').type('legend');
    cy.get('.section-content.events').should('exist');
    cy.get('.events-empty').should('not.exist');
  });
});
