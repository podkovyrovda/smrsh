export default class SelectController {
  constructor (model, view) {
    this._model = model;
    this._view = view;
  }

  render(data, type) {
    const dataType = this._model.getDataType(data, type);
    return this._view.create(dataType)
  }
}
