import {createEventsListTemplate} from './view/events-list-view.js';
import {createEventItemTemplate} from './view/event-item-view.js';
import {createEventFormEditTemplate} from './view/event-form-edit-view';

import TripInfoView from './view/trip-info';
import TripCostView from './view/trip-cost';
import TripNavView from './view/trip-nav';
import TripFilterView from './view/trip-filter';
import TripSortView from './view/trip-sort';

import {renderTemplate, renderElement, RenderPosition, getEvents} from "./utils";

const events = getEvents();

const pageBodyElement = document.querySelector('.page-body');
const pageHeaderElement = pageBodyElement.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripNavElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFilterElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const eventsElement = pageMainElement.querySelector('.trip-events');
renderElement(tripMainElement, new TripInfoView(events).getElement(), RenderPosition.AFTERBEGIN);
const tripInfoElement = pageHeaderElement.querySelector('.trip-info');
renderElement(tripInfoElement, new TripCostView(events).getElement(), RenderPosition.BEFOREEND);
renderElement(tripNavElement, new TripNavView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripFilterElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);
renderElement(eventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);

let eventListTemplate = '';
events.forEach((item) => {
  eventListTemplate += createEventItemTemplate(item);
});

renderTemplate(eventsElement, createEventsListTemplate(eventListTemplate), 'beforeend');

const editEvent = eventsElement.querySelector('.trip-events__item');
renderTemplate(editEvent, createEventFormEditTemplate(events[0]), 'beforeend');
