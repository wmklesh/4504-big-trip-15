import EventListView from '../view/event-list';
import EventSortView from '../view/event-sort';
import NoEventView from '../view/no-event';
import PointPresenter from './point';
import {render, RenderPosition} from '../utils/render';
import {updateItem} from '../utils/common';

export default class Event {
  constructor(eventContainer) {
    this._eventContainer = eventContainer;
    this._pointPresenter = new Map();

    this._listComponent = new EventListView();
    this._sortComponent = new EventSortView();
    this._noEventComponent = new NoEventView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
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
    const pointPresenter = new PointPresenter(this._listComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderEvents() {
    this._events.forEach((item) => {
      this._renderPoint(item);
    });
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _handlePointChange(updatedPoint) {
    this._events = updateItem(this._events, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }
}
