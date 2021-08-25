import {renderElement, RenderPosition, getEvents} from "./utils";
import TripInfoView from './view/trip-info';
import TripCostView from './view/trip-cost';
import TripNavView from './view/trip-nav';
import TripFilterView from './view/trip-filter';
import TripSortView from './view/trip-sort';
import EventsListView from './view/events-list';
import EventItemView from './view/event-item';

const events = getEvents();

const pageBodyElement = document.querySelector('.page-body');
const pageHeaderElement = pageBodyElement.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripNavElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFilterElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const eventsElement = pageMainElement.querySelector('.trip-events');
const tripInfoElement = new TripInfoView(events).getElement();
renderElement(tripMainElement, tripInfoElement, RenderPosition.AFTERBEGIN);
renderElement(tripInfoElement, new TripCostView(events).getElement(), RenderPosition.BEFOREEND);
renderElement(tripNavElement, new TripNavView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripFilterElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);
renderElement(eventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);

const eventsListElement = new EventsListView().getElement();
renderElement(eventsElement, eventsListElement, RenderPosition.BEFOREEND);

events.forEach((item) => {
  renderElement(eventsListElement, new EventItemView(item).getElement(), RenderPosition.BEFOREEND);
});
