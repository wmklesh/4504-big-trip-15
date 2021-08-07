import dayjs from "dayjs";

export const createTripInfoTemplate = (events) => {
  const routes = [];

  events.forEach((item) => {
    if (item.destination != routes[routes.length - 1]) {
      routes.push(item.destination);
    }
  });

  const routerStr = routes.join(' - ');

  const fromDate = events[0].date.from;
  const toDate = events[events.length - 1].date.to;
  const datesStr = `${dayjs(fromDate).format('MMM D')} - ${dayjs(toDate).format('D')}`;

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${routerStr}</h1>

      <p class="trip-info__dates">${datesStr}</p>
    </div>

  </section>`
};
