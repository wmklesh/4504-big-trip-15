import AbstractView from './abstract';
import {FilterType} from '../const';

const createTripFilterTemplate = (currentFilterType) => (
  `<form class="trip-filters" action="#" method="get">
    ${Object.entries(FilterType).map(([type, filter]) => (`
      <div class="trip-filters__filter">
        <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${filter === currentFilterType ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${filter}" data-filter-type="${filter}">${type}</label>
      </div>
    `)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripFilter extends AbstractView {
  constructor(currentFilterType) {
    super();
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createTripFilterTemplate(this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
