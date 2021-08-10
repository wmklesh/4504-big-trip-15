import {sumEventOffers} from '../utils';

export const createTripCostTemplate = (events) => {
  const cost = events.reduce((sum, event) => (
    sum += event.base_price + sumEventOffers(event)
  ), 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};
