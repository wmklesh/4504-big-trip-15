import AbstractView from './abstract';

const createEventsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class EventList extends AbstractView {
  getTemplate() {
    return createEventsListTemplate();
  }
}
