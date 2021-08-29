import AbstractView from './abstract';
import {sumEventOffersPrice} from '../utils';

const createTripCostTemplate = (events) => {
  const cost = events.reduce((sum, event) => (
    sum += event.basePrice + sumEventOffersPrice(event)
  ), 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

export default class TripCost extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
  }
}
