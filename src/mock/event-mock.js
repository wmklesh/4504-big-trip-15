import dayjs from 'dayjs';
import {getRandomInteger} from '../utils/common';
import {EVENT_TYPES} from '../const';
import {OFFERS} from './offers-mock';

const generateDate = () => {
  const fromDate = dayjs().add(getRandomInteger(-3, 3), 'd').add(getRandomInteger(-12, 12), 'h').set('m', 0).set('s', 0);
  const toDate = fromDate.add(getRandomInteger(0, 30), 'h').add(getRandomInteger(0, 60), 'm');

  return {
    'from': fromDate.toDate(),
    'to': toDate.toDate(),
  };
};

const generateType = () => (
  EVENT_TYPES[getRandomInteger(0, EVENT_TYPES.length - 1)]
);

const generateDestination = () => {
  const destinations = ['Amsterdam', 'Chamonix', 'Geneva'];

  return destinations[getRandomInteger(0, destinations.length - 1)];
};

const generateOffers = () => (
  Array(getRandomInteger(0, 2)).fill().map(() => (OFFERS[getRandomInteger(0, OFFERS.length - 1)]))
);

const generateDescription = (length = 1) => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

  const descriptions = text.split('.');

  const result = Array(getRandomInteger(1, length)).fill().map(() => (
    descriptions[getRandomInteger(0, descriptions.length - 1)]
  ));

  return `${result.join('. ')}.`;
};

const generatePictures = () => (
  Array(getRandomInteger(1, 3)).fill().map(() => ({
    'src': `http://picsum.photos/248/152?r=${getRandomInteger(1, 1000)}`,
    'title': generateDescription(),
  }))
);

export const generateEvent = () => ({
  date: generateDate(),
  type: generateType(),
  destination: generateDestination(),
  basePrice: getRandomInteger(10, 200),
  offers: generateOffers(),
  isFavorite: Boolean(getRandomInteger()),
  pictures: generatePictures(),
  description: generateDescription(5),
});
