export const sumOffersPrice = (point) => point.offers.reduce((sum, offer) => (sum += offer.price), 0);

export const sortByDate = (points) => points.sort((a, b) => a.date.from > b.date.from ? 1 : -1);
