import InfoView from '../view/trip-info';
import CostView from '../view/trip-cost';
import NavView from '../view/trip-nav';
import FilterView from '../view/trip-filter';
import ListView from '../view/trip-list';
import SortView from '../view/trip-sort';
import NoPointView from '../view/no-point';
import PointPresenter from './point';
import {remove, render, RenderPosition} from '../utils/render';
import {updateItem} from '../utils/common';
import {filterFuture, filterPast, sortDay, sortPrice} from '../utils/point';
import {FilterType, SortType} from '../const';

export default class Trip {
  constructor(tripContainer, listContainer) {
    this._tripContainer = tripContainer;
    this._listContainer = listContainer;
    this._pointPresenter = new Map();
    this._currentFilterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DAY;

    this._navContainer = this._tripContainer.querySelector('.trip-controls__navigation');
    this._filterContainer = this._tripContainer.querySelector('.trip-controls__filters');

    this._navComponent = new NavView();
    this._filterComponent = new FilterView(this._currentFilterType);
    this._listComponent = new ListView();
    this._sortComponent = new SortView(this._currentSortType);
    this._noPointComponent = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();

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
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
  }

  _renderList() {
    render(this._listContainer, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._listContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  _filterPoints(filterType) {
    switch (filterType) {
      case FilterType.FUTURE:
        this._points = this._sourcedPoints.filter(filterFuture);
        break;
      case FilterType.PAST:
        this._points = this._sourcedPoints.filter(filterPast);
        break;
      default:
        this._points = this._sourcedPoints.slice();
    }

    this._currentFilterType = filterType;
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._points = this._points.sort(sortPrice);
        break;
      default:
        this._points = this._points.sort(sortDay);
    }

    this._currentSortType = sortType;
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilterType === filterType) {
      return;
    }

    remove(this._filterComponent);
    this._filterComponent = new FilterView(filterType);
    this._renderFilter();

    this._filterPoints(filterType);
    this._clearPointList();
    this._renderPointList();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    remove(this._sortComponent);
    this._sortComponent = new SortView(sortType);
    this._renderSort();

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPointList();
  }
}
