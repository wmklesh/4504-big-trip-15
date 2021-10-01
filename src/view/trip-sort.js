import AbstractView from './abstract';
import {SortType} from '../const';

const createTripSortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.entries(SortType).map(([type, sort]) => (`
      <div class="trip-sort__item  trip-sort__item--${sort}">
        <input id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${sort}" ${sort === currentSortType ? 'checked' : ''}>
        <label class="trip-sort__btn" for="sort-${sort}" data-sort-type="${sort}">${type}</label>
      </div>
    `)).join('')}
  </form>`
);

export default class TripSort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createTripSortTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL' && evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
