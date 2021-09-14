import InfoView from '../view/trip-info';
import CostView from '../view/trip-cost';
import NavView from '../view/trip-nav';
import FilterView from '../view/trip-filter';
import ListView from '../view/trip-list';
import SortView from '../view/trip-sort';
import NoPointView from '../view/no-point';
import PointPresenter from './point';
import {render, RenderPosition} from '../utils/render';
import {updateItem} from '../utils/common';

export default class Trip {
  constructor(tripContainer, listContainer) {
    this._tripContainer = tripContainer;
    this._listContainer = listContainer;
    this._pointPresenter = new Map();

    this._navContainer = this._tripContainer.querySelector('.trip-controls__navigation');
    this._filterContainer = this._tripContainer.querySelector('.trip-controls__filters');

    this._navComponent = new NavView();
    this._filterComponent = new FilterView();
    this._listComponent = new ListView();
    this._sortComponent = new SortView();
    this._noPointComponent = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._points = points;

    this._infoComponent = new InfoView(this._points);
    this._costComponent = new CostView(this._points);

    this._renderInfo();
    this._renderNav();
    this._renderCost();
    this._renderFilter();
    this._renderList();

    if (points.length > 0) {
      this._renderSort();
      this._renderPointList();
    } else {
      this._renderNoPoint();
    }
  }

  _renderInfo() {
    render(this._tripContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderCost() {
    render(this._infoComponent, this._costComponent, RenderPosition.BEFOREEND);
  }

  _renderNav() {
    render(this._navContainer, this._navComponent, RenderPosition.BEFOREEND);
  }

  _renderFilter() {
    render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
  }

  _renderList() {
    render(this._listContainer, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._listContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderNoPoint() {
    render(this._listContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderPointList() {
    this._points.forEach((item) => {
      this._renderPoint(item);
    });
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._listComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }
}
