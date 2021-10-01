import dayjs from 'dayjs';
import AbstractView from './abstract';

const createTripInfoTemplate = (points) => {
  let routerStr = '';
  let datesStr = '';

  if (points.length > 0) {
    const routes = [];
    points.forEach((item) => {
      if (item.destination !== routes[routes.length - 1]) {
        routes.push(item.destination);
      }
    });

    routerStr = routes.join(' - ');

    const fromDate = points[0].date.from;
    const toDate = points[points.length - 1].date.to;

    datesStr = `${dayjs(fromDate).format('MMM D')} - ${dayjs(toDate).format('D')}`;
  }

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${routerStr}</h1>

      <p class="trip-info__dates">${datesStr}</p>
    </div>
  </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
  }
}
