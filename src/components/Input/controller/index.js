export default class InputController {
  constructor(model, view) {
    this._model = model;
    this._view = view;
  }
  
  render(type) {
    return this._view.create(type)
  }
}
