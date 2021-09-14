import AbstractView from './abstract';
import {FilterType} from '../const';

const createTripFilterTemplate = (filterSelect) => (
  `<form class="trip-filters" action="#" method="get">
    ${Object.entries(FilterType).map(([type, sort]) => (`
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${sort}" data-sort-type="${sort}" ${sort === filterSelect ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-everything">${sort}</label>
    </div>
    `)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripFilter extends AbstractView {
  constructor() {
    super();
    this._filterSelect = FilterType.EVERYTHING;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createTripFilterTemplate(this._filterSelect);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.FilterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
