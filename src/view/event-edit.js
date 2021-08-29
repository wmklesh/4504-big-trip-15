import dayjs from 'dayjs';
import AbstractView from './abstract';
import {sumEventOffersPrice} from '../utils/event';
import {EVENT_TYPES} from '../const';
import {OFFERS} from '../mock/offers-mock';

const createEventGroupTypeTemplate = (type) => (
  `<fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${EVENT_TYPES.map((item) => (`
      <div class="event__type-item">
        <input id="event-type-${String(item).toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${item === type ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${String(item).toLowerCase()}" for="event-type-${String(item).toLowerCase()}-1">${item}</label>
      </div>`)).join('')}
    </fieldset>`
);

const createEventGroupOfferTemplate = (offers, selectOffers) => (
  `<div class="event__available-offers">
    ${offers.map((offer) => (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${selectOffers.some((item) => (item.title === offer.title)) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `)).join('')}
   </div>`
);

export const createEventEditTemplate = (event) => {

  const groupTypeTemplate = createEventGroupTypeTemplate(event.type);
  const groupOfferTemplate = createEventGroupOfferTemplate(OFFERS, event.offers);
  const totalPrice = event.basePrice + sumEventOffersPrice(event);

  const startTimeStr = dayjs(event.date.from).format('DD/MM/YY HH:mm');
  const endTimeStr = dayjs(event.date.to).format('DD/MM/YY HH:mm');

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            ${groupTypeTemplate}
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${event.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${event.destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTimeStr}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTimeStr}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${totalPrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          ${groupOfferTemplate}
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
            ${event.description}
          </p>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EventEdit extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }
}
