import EventView from '../view/event';
import EventEditView from '../view/event-edit';
import EventListView from '../view/event-list';
import EventSortView from '../view/event-sort';
import NoEventView from '../view/no-event';
import {render, RenderPosition, replace} from '../utils/render';

export default class Event {
  constructor(eventContainer) {
    this._eventContainer = eventContainer;

    this._listComponent = new EventListView();
    this._sortComponent = new EventSortView();
    this._noEventComponent = new NoEventView();
  }

  init(events) {
    this._events = events;

    this._renderList();

    if (events.length > 0) {
      this._renderSort();
      this._renderEvents();
    } else {
      this._renderNoEvent();
    }
  }

  _renderList() {
    render(this._eventContainer, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._eventContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoEvent() {
    render(this._eventContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
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

    render(this._listComponent, eventComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    this._events.forEach((item) => {
      this._renderEvent(item);
    });
  }
}
