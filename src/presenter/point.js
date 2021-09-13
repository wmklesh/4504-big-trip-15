import PointView from '../view/point';
import PointEditView from '../view/point-edit';
import {render, RenderPosition, replace} from "../utils/render";

export default class Point {
  constructor(listContainer) {
    this._listContainer = listContainer;
  }

  init(point) {
    this._point = point;

    this._pointComponent = new PointView(this._point);
    this._pointEditComponent = new PointEditView(this._point);

    this._render();
  }

  _render() {
    const replaceEventToForm = () => {
      replace(this._pointEditComponent, this._pointComponent);
    };

    const replaceFormToEvent = () => {
      replace(this._pointComponent, this._pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    this._pointComponent.setEditClickHandler(() => {
      replaceEventToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    this._pointEditComponent.setEditClickHandler(() => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    this._pointEditComponent.getElement().querySelector('.event__save-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToEvent();
    });

    render(this._listContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }
}
