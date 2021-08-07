import {createTripInfoTemplate} from './view/trip-info-view.js';
import {createTripCostTemplate} from './view/trip-cost-view';
import {createTripNavTemplate} from './view/trip-nav-view.js';
import {createTripFilterTemplate} from './view/trip-filter-view.js';
import {createTripSortTemplate} from './view/trip-sort-view.js';
import {createEventsListTemplate} from './view/events-list-view.js';
import {createEventItemTemplate} from './view/event-item-view.js';
import {generateEvent} from "./mock/event-mock";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageBodyElement = document.querySelector('.page-body');
const pageHeaderElement = pageBodyElement.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFilterElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const eventsElement = pageMainElement.querySelector('.trip-events');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');
const tripInfoElement = pageHeaderElement.querySelector('.trip-info');
render(tripInfoElement, createTripCostTemplate(), 'beforeend');
render(tripNavigationElement, createTripNavTemplate(), 'beforeend');
render(tripFilterElement, createTripFilterTemplate(), 'beforeend');
render(eventsElement, createTripSortTemplate(), 'beforeend');

const events = getEvents();
let eventListTemplate = '';
events.forEach((item) => {
  eventListTemplate += createEventItemTemplate(item);
});

render(eventsElement, createEventsListTemplate(eventListTemplate), 'beforeend');

function getEvents() {
  return Array(20).fill().map(() => {
    return generateEvent();
  });
}
