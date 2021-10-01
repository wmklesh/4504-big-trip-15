import dayjs from 'dayjs';

export const sumOffersPrice = (point) => point.offers.reduce((sum, offer) => (sum += offer.price), 0);

export const sortByDate = (points) => points.sort((a, b) => a.date.from > b.date.from ? 1 : -1);

export const filterFuture = (point) => (dayjs().isBefore(dayjs(point.date.from)));

export const filterPast = (point) => (dayjs().isAfter(dayjs(point.date.from)));

export const sortDay = (a, b) => a.date.from > b.date.from ? 1 : -1;

export const sortPrice = (a, b) => a.basePrice < b.basePrice ? 1 : -1;
