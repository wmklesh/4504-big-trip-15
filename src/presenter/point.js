import PointView from '../view/point';
import PointEditView from '../view/point-edit';
import {render, RenderPosition, replace, remove} from "../utils/render";

export default class Point {
  constructor(listContainer) {
    this._listContainer = listContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(this._point);
    this._pointEditComponent = new PointEditView(this._point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._listContainer, this._pointComponent, RenderPosition.BEFOREEND);

      return;
    }

    if (this._listContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._listContainer.getElement().contains(prevPointEditComponent.getElement())) {
      replace(this._pointComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  _destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }
}
