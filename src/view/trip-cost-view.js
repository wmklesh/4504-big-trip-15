export const createTripCostTemplate = (events) => {
  const cost = events.reduce((total, event) => (
    total += event.base_price + event.offers.reduce((sum, offer) => (
      sum += offer.price
    ), 0)
  ), 0);

  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>`
};
