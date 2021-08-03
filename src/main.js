import {createTripInfoTemplate} from './view/trip-info-view.js';
import {createTripCostTemplate} from './view/trip-cost-view';
import {createTripNavTemplate} from './view/trip-nav-view.js';
import {createTripFilterTemplate} from './view/trip-filter-view.js';
import {createTripSortTemplate} from './view/trip-sort-view.js';
import {createEventsListTemplate} from './view/events-list-view.js';
import {createEventItemTemplate} from './view/event-item-view.js';
import {createEventOfferItemTemplate} from './view/event-offer-item-view.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageBodyElement = document.querySelector('.page-body');
const pageHeaderElement = pageBodyElement.querySelector('.page-header');
const tripMainElement = pageHeaderElement.querySelector('.trip-main');
const tripNavigationElement = tripMainElement.querySelector('.trip-controls__navigation');
const tripFilterElement = tripMainElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-main');
const eventsElement = pageMainElement.querySelector('.trip-events');
render(tripMainElement, createTripInfoTemplate(), 'afterbegin');
const tripInfoElement = pageHeaderElement.querySelector('.trip-info');
render(tripInfoElement, createTripCostTemplate(), 'beforeend');
render(tripNavigationElement, createTripNavTemplate(), 'beforeend');
render(tripFilterElement, createTripFilterTemplate(), 'beforeend');
render(eventsElement, createTripSortTemplate(), 'beforeend');

let eventListTemplate = '';
getEvents().forEach((item) => {
  const dateStart = new Date(item.date.start);
  const dateEnd = new Date(item.date.end);

  let diffSecs = (dateEnd - dateStart) / 1000;
  const diffHours = Math.floor(diffSecs / 3600);
  diffSecs %= 3600;
  const diffMinutes = Math.floor(diffSecs / 60);

  item.time.start = dateStart.toLocaleTimeString().slice(0,-3);
  item.time.end = dateEnd.toLocaleTimeString().slice(0,-3);
  item.time.diff = (diffHours ? `${twoDigits(diffHours)}H ` : '') + (diffMinutes ? `${twoDigits(diffMinutes)}M` : '');

  let offerListTemplate = '';
  item.offers.forEach((offer) => {
    offerListTemplate += createEventOfferItemTemplate(offer);
  });

  eventListTemplate += createEventItemTemplate(item, offerListTemplate);
});

render(eventsElement, createEventsListTemplate(eventListTemplate), 'beforeend');

function getEvents() {
  function Event(title, img, dateStart, dateEnd, price, offers, favorite) {
    this.title = title;
    this.img = img;
    this.date = {
      start: dateStart,
      end: dateEnd,
      day: null,
    };
    this.price = price;
    this.offers = offers;
    this.favorite = favorite;
    this.time = {
      start: null,
      end: null,
      diff: null,
    };
  }

  function Offer(title, price) {
    this.title = title;
    this.price = price;
  }

  return [
    new Event('Taxi Amsterdam', 'taxi.png', '2019-03-18T10:30', '2019-03-18T11:00', 20, [new Offer('Order Uber', 20)], true),
    new Event('Flight Chamonix', 'flight.png', '2019-03-18T12:25', '2019-03-18T13:35', 50, [new Offer('Add luggage', 50), new Offer('Switch to comfort', 80)], false),
    new Event('Drive Chamonix', 'drive.png', '2019-03-18T14:30', '2019-03-18T16:05', 160, [new Offer('Rent a car', 200)], true),
  ];
}

function twoDigits(num) {
  return (`0${num}`).slice(-2);
}
