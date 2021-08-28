import {render, RenderPosition, getEvents} from './utils';
import TripInfoView from './view/trip-info';
import TripCostView from './view/trip-cost';
import TripNavView from './view/trip-nav';
import TripFilterView from './view/trip-filter';
import TripSortView from './view/trip-sort';
import EventListView from './view/event-list';
import EventView from './view/event';
import EventEditView from './view/event-edit';
import NoEventView from './view/no-event';

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__save-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const events = getEvents();

const pageBodyElement = document.querySelector('.page-body');
const pageHeaderElement = pageBodyElement.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripNavElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFilterElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const eventsElement = pageMainElement.querySelector('.trip-events');
render(tripNavElement, new TripNavView().getElement(), RenderPosition.BEFOREEND);
render(tripFilterElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND);

const eventListComponent = new EventListView();
render(eventsElement, eventListComponent.getElement(), RenderPosition.BEFOREEND);

if (events.length === 0) {
  render(eventsElement, new NoEventView().getElement(), RenderPosition.BEFOREEND);
} else {
  const tripInfoElement = new TripInfoView(events).getElement();
  render(tripMainElement, tripInfoElement, RenderPosition.AFTERBEGIN);
  render(tripInfoElement, new TripCostView(events).getElement(), RenderPosition.BEFOREEND);
  render(eventsElement, new TripSortView().getElement(), RenderPosition.BEFOREEND);

  events.forEach((item) => {
    renderEvent(eventListComponent.getElement(), item);
  });
}
