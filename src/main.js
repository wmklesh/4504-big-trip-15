import TripInfoView from './view/trip-info';
import TripCostView from './view/trip-cost';
import TripNavView from './view/trip-nav';
import TripFilterView from './view/trip-filter';
import TripSortView from './view/trip-sort';
import EventListView from './view/event-list';
import EventView from './view/event';
import EventEditView from './view/event-edit';
import NoEventView from './view/no-event';
import {render, RenderPosition, replace} from './utils/render';
import {sortEventByDate} from './utils/event';
import {generateEvent} from './mock/event-mock';

const EVENT_COUNT = 15;

const events = sortEventByDate(new Array(EVENT_COUNT).fill().map(generateEvent));

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceEventToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToEvent = () => {
    replace(eventComponent, eventEditComponent);
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

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

const pageBodyElement = document.querySelector('.page-body');
const pageHeaderElement = pageBodyElement.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripNavElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFilterElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const eventsElement = pageMainElement.querySelector('.trip-events');
render(tripNavElement, new TripNavView(), RenderPosition.BEFOREEND);
render(tripFilterElement, new TripFilterView(), RenderPosition.BEFOREEND);

const eventListComponent = new EventListView();
render(eventsElement, eventListComponent, RenderPosition.BEFOREEND);

if (events.length === 0) {
  render(eventsElement, new NoEventView(), RenderPosition.BEFOREEND);
} else {
  const tripInfoView = new TripInfoView(events);
  render(tripMainElement, tripInfoView, RenderPosition.AFTERBEGIN);
  render(tripInfoView, new TripCostView(events), RenderPosition.BEFOREEND);
  render(eventsElement, new TripSortView(), RenderPosition.AFTERBEGIN);

  events.forEach((item) => {
    renderEvent(eventListComponent, item);
  });
}
