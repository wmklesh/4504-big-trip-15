import AbstractView from './abstract';

const createTripSortTemplate = (sorts) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.entries(sorts).map(([item, flag]) => (`
      <div class="trip-sort__item  trip-sort__item--day">
        <input id="sort-${String(item).toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${String(item).toLowerCase()}" ${flag}>
      <label class="trip-sort__btn" for="sort-${String(item).toLowerCase()}">${item}</label>
    </div>
    `)).join('')}
  </form>`
);

export default class TripSort extends AbstractView {
  constructor() {
    super();
    this._sorts = {
      Day: 'checked',
      Event: 'disabled',
      Time: '',
      Price: '',
      Offers: 'disabled',
    };
  }

  getTemplate() {
    return createTripSortTemplate(this._sorts);
  }
}
