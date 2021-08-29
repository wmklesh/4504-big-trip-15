import TripInfoView from './view/trip-info';
import TripCostView from './view/trip-cost';
import TripNavView from './view/trip-nav';
import TripFilterView from './view/trip-filter';
import TripSortView from './view/trip-sort';
import EventListView from './view/event-list';
import EventView from './view/event';
import EventEditView from './view/event-edit';
import NoEventView from './view/no-event';
import {render, RenderPosition, sortEventByDate} from './utils';
import {generateEvent} from './mock/event-mock';

const EVENT_COUNT = 15;

const events = sortEventByDate(new Array(EVENT_COUNT).fill().map(generateEvent));

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

  eventComponent.setEditClickHandler(() => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setEditClickHandler(() => {
    replaceFormToEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__save-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

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
  render(eventsElement, new TripSortView().getElement(), RenderPosition.AFTERBEGIN);

  events.forEach((item) => {
    renderEvent(eventListComponent.getElement(), item);
  });
}
