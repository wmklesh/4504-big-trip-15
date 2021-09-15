import dayjs from 'dayjs';
import AbstractView from './abstract';
import {twoDigits} from '../utils/common';
import {sumEventOffersPrice} from '../utils/event';

const createEventTemplate = (event) => {
  const fromDate = dayjs(event.date.from);
  const toDate = dayjs(event.date.to);

  const fromDateStr = fromDate.format('MMM D');
  const fromTimeStr = fromDate.format('HH:mm');
  const toTimeStr = toDate.format('HH:mm');

  let diffTimeMinutes = toDate.diff(dayjs(fromDate), 'm');

  const diffTimeDays = Math.floor(diffTimeMinutes / 1440);
  diffTimeMinutes %= 1440;

  const diffTimeHours = Math.floor(diffTimeMinutes / 60);
  diffTimeMinutes %= 60;

  const diffTimeStr = (diffTimeDays ? `${twoDigits(diffTimeDays)}D ` : '')
    + (diffTimeHours ? `${twoDigits(diffTimeHours)}H ` : '')
    + (diffTimeMinutes ? `${twoDigits(diffTimeMinutes)}M` : '');

  const totalPrice = event.basePrice + sumEventOffersPrice(event);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="2019-03-18">${fromDateStr}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${event.type} ${event.destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${fromTimeStr}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${toTimeStr}</time>
        </p>
        <p class="event__duration">${diffTimeStr}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${totalPrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${event.offers.map((item) => (`
          <li class="event__offer">
            <span class="event__offer-title">${item.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
          </li>
        `)).join('')}
      </ul>
      <button class="event__favorite-btn ${event.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        ${event.isFavorite ? '<span class="visually-hidden">Add to favorite</span>' : ''}
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
