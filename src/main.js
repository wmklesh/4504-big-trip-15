import TripPresenter from './presenter/trip';
import EventPresenter from './presenter/event';
import {sortEventByDate} from './utils/event';
import {generateEvent} from './mock/event-mock';

const EVENT_COUNT = 15;

const events = sortEventByDate(new Array(EVENT_COUNT).fill().map(generateEvent));

const pageBodyElement = document.querySelector('.page-body');
const tripElement = pageBodyElement.querySelector('.trip-main');
const eventElement = pageBodyElement.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripElement);
tripPresenter.init(events);

const eventPresenter = new EventPresenter(eventElement);
eventPresenter.init(events);
