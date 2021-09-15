import TripInfoView from '../view/trip-info';
import TripCostView from '../view/trip-cost';
import TripNavView from '../view/trip-nav';
import TripFilterView from '../view/trip-filter';
import {render, RenderPosition} from '../utils/render';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._navComponent = new TripNavView();
    this._filterView = new TripFilterView();
  }

  init(events) {
    this._events = events;

    this._tripNavContainer = this._tripContainer.querySelector('.trip-controls__navigation');
    this._tripFilterContainer = this._tripContainer.querySelector('.trip-controls__filters');

    this._renderNav();
    this._renderFilter();
    this._renderInfo();
  }

  _renderInfo() {
    if (this._events.length === 0) {
      return;
    }

    this._infoComponent = new TripInfoView(this._events);
    render(this._tripContainer, this._infoComponent, RenderPosition.AFTERBEGIN);

    this._renderCost();
  }

  _renderCost() {
    this._costComponent = new TripCostView(this._events);
    render(this._infoComponent, this._costComponent, RenderPosition.BEFOREEND);
  }

  _renderNav() {
    render(this._tripNavContainer, this._navComponent, RenderPosition.BEFOREEND);
  }

  _renderFilter() {
    render(this._tripFilterContainer, this._filterView, RenderPosition.BEFOREEND);
  }
}
