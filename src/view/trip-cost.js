import AbstractView from './abstract';
import {sumOffersPrice} from '../utils/point';

const createTripCostTemplate = (points) => {
  const cost = points.reduce((sum, point) => (
    sum += point.basePrice + sumOffersPrice(point)
  ), 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`;
};

export default class TripCost extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripCostTemplate(this._points);
  }
}
