export const sumEventOffersPrice = (event) => event.offers.reduce((sum, offer) => (sum += offer.price), 0);

export const sortEventByDate = (events) => events.sort((a, b) => a.date.from > b.date.from ? 1 : -1);
