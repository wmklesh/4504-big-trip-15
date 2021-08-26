import {createElement} from '../utils';
import {TRIP_FILTERS} from '../const';

const createTripFilterTemplate = (filterSelect) => (
  `<form class="trip-filters" action="#" method="get">
    ${TRIP_FILTERS.map((item) => (`
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${String(item).toLowerCase()}" ${item === filterSelect ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-everything">${item}</label>
    </div>
    `)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripNav {
  constructor() {
    this._element = null;
    this._filterSelect = TRIP_FILTERS[0];
  }

  getTemplate() {
    return createTripFilterTemplate(this._filterSelect);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
