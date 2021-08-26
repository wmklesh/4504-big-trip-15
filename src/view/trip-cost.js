import {createElement, sumPriceEventOffers} from '../utils';

const createTripCostTemplate = (events) => {
  const cost = events.reduce((sum, event) => (
    sum += event.basePrice + sumPriceEventOffers(event)
  ), 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

export default class TripCost {
  constructor(events) {
    this._element = null;
    this._events = events;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
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
