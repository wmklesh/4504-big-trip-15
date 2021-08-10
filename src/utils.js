export const getRandomInteger = (min = 0, max = 1) => Math.floor(min + Math.random() * (max + 1 - min));

export const twoDigits = (num) => (`0${num}`).slice(-2);

export const sumEventOffers = (event) => (event.offers.reduce((sum, offer) => (sum += offer.price), 0));
