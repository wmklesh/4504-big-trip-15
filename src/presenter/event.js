import EventListView from '../view/event-list';
import EventSortView from '../view/event-sort';
import NoEventView from '../view/no-event';
import PointPresenter from './point';
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

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent);
    pointPresenter.init(point);
  }

  _renderEvents() {
    this._events.forEach((item) => {
      this._renderPoint(item);
    });
  }
}
