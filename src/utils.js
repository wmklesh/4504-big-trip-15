import {generateEvent} from './mock/event-mock';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (min = 0, max = 1) => Math.floor(min + Math.random() * (max + 1 - min));

export const twoDigits = (num) => (`0${num}`).slice(-2);

export const sumEventOffersPrice = (event) => (event.offers.reduce((sum, offer) => (sum += offer.price), 0));

export const sortEventByDate = (events) => events.sort((a, b) => a.date.from > b.date.from ? 1 : -1);


