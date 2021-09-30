import TripPresenter from './presenter/trip';
import {sortByDate} from './utils/point';
import {generatePoint} from './mock/point';

const POINT_COUNT = 15;

const points = sortByDate(new Array(POINT_COUNT).fill().map(generatePoint));

const tripElement = document.querySelector('.trip-main');
const listElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripElement, listElement);
tripPresenter.init(points);
