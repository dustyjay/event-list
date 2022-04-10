import { mount } from '@cypress/vue';
import EventModel from '../../models/event.model';
import testData from './test-data.json';
import EventCard from '../EventCard/EventCard.vue';

const eventWithImage = new EventModel(testData[0]);
const eventWithoutImage = new EventModel(testData[1]);

describe('Event card', () => {
  it('renders an image if available', () => {
    mount(EventCard, { props: { event: eventWithImage } });
    cy.get('.card-img')
      .children('img')
      .should('have.attr', 'src', eventWithImage.artist.image_url);
  });

  it('renders the event name if image is not available', () => {
    mount(EventCard, { props: { event: eventWithoutImage } });
    cy.get('.card-img').children().contains(eventWithoutImage.lineup[0]);
  });

  it('opens a new tab with event URL when you select "Buy Ticket"', () => {
    mount(EventCard, { props: { event: eventWithImage } });
    cy.get('a').should('have.attr', 'target', '_blank');
    cy.get('a').should('have.attr', 'href', eventWithImage.url);
  });

  it('renders a slightly different UI if it is a featured event', () => {
    mount(EventCard, { props: { event: eventWithImage, isFeatured: true } });
    cy.get('.card').should('have.class', 'featured');
  });
});
